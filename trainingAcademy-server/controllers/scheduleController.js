const Schedule = require("../models/schedule")


const createSchedule = async (req,res) => {
 try{
  const schedule = new Schedule(req.body)
  const savedSchedule = await schedule.save()
  res.status(201).json(savedSchedule)
 }
 catch(err){
  res.status(500).json({
   message:err.message
  })
 }
}

const addSession = async (req, res) => {
  try {
    const { course, date, session } = req.body;

    session.availableSlots = session.maxCapacity;

    let schedule = await Schedule.findOne({ course, date });

    if (!schedule) {
      schedule = new Schedule({
        course,
        date,
        sessions: [session],
      });
    } else {
      schedule.sessions.push(session);
    }

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const toggleSession = async(req,res)=>{
 const schedule = await Schedule.findOne({
  "sessions._id":req.params.id
 })
 const session =
 schedule.sessions.id(req.params.id)
 session.status =
 session.status === "Active"
 ? "Inactive"
 : "Active"
 await schedule.save()
 res.json(schedule)
}

const getCourseSchedules = async (req,res) => {
 try{
  const schedules = await Schedule.find({
   course:req.params.courseId
  }).sort({date:1})
  res.json(schedules)
 }
 catch(err){
  res.status(500).json({
   message:err.message
  })
 }
}

const deleteSchedule = async (req,res) => {
 try{
  await Schedule.findByIdAndDelete(req.params.id)
  res.json({
   message:"Schedule deleted"
  })
 }
 catch(err){
  res.status(500).json({
   message:err.message
  })
 }
}

const deleteSession = async(req,res)=>{
 try{
  const schedule = await Schedule.findOne({
   "sessions._id":req.params.id
  })
  if(!schedule){
   return res.status(404).json({
    message:"Schedule not found"
   })
  }
schedule.sessions.pull(req.params.id)

if(schedule.sessions.length === 0){
  await schedule.deleteOne()
}else{
  await schedule.save()
}
  res.json({
   message:"Session deleted"
  })
 }
 catch(err){
  res.status(500).json({
   message:err.message
  })
 }
}

module.exports = {
 createSchedule,
 getCourseSchedules,
 deleteSchedule,
 addSession,
 toggleSession,
 deleteSession
}





