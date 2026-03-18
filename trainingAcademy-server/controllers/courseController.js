const Course = require("../models/Course")
const slugify =require( "slugify")


const createCourse = async (req,res)=>{

try{

const slug = slugify(req.body.title,{
lower:true,
strict:true
}) + "-" + Date.now()

let imageUrl = req.body.image

if(req.file){
imageUrl = req.file.path
}

const course = new Course({
...req.body,
image:imageUrl,
slug
})

const savedCourse = await course.save()

res.status(201).json(savedCourse)

}catch(err){
res.status(500).json({message:err.message})
}

}

const getCourses = async (req,res)=>{
 try{

 const courses = await Course.find()

 res.json(courses)

 }catch(err){
 res.status(500).json({message:err.message})
 }
}

const updateCourse = async (req,res)=>{
try{

let updateData = {...req.body}

// slug update
if(req.body.title){
updateData.slug = slugify(req.body.title,{
lower:true,
strict:true
})
}

// image logic
if(req.file){
updateData.image = req.file.path
}

const updatedCourse = await Course.findByIdAndUpdate(
req.params.id,
updateData,
{ returnDocument: "after" }
)

res.json(updatedCourse)

}catch(err){
res.status(500).json({message:err.message})
}
}



const deleteCourse = async (req,res)=>{
  try{

    await Course.findByIdAndDelete(req.params.id)

    res.json({message:"Course deleted successfully"})

  }catch(err){
    res.status(500).json({message:err.message})
  }
}
const getCourseById = async (req,res)=>{
  try{

    const course = await Course.findById(req.params.id)

    if(!course){
      return res.status(404).json({message:"Course not found"})
    }

    res.json(course)

  }catch(err){
    res.status(500).json({message:err.message})
  }
}

      module.exports = { createCourse, getCourses, deleteCourse, updateCourse, getCourseById }
