const StudentMain = require("../models/student_main");
const EnrollmentFlow = require("../models/EnrollmentFlows");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // 🔥 ADD THIS

exports.createStudent = async (req, res) => {
  try {
    const data = req.body;

    let student = await StudentMain.findOne({ email: data.email });

    const rawPassword =
      data.password && data.password.trim() !== ""
        ? data.password
        : "123456";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    if (!student) {
      student = new StudentMain({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword, // ✅ FIXED
        courses: [
          {
            courseId: data.courseId,
            sessionId: data.sessionId,
            step: 2
          }
        ]
      });

    } else {
      const alreadyExists = student.courses.find(
        c => c.courseId.toString() === data.courseId
      );

      if (!alreadyExists) {
        student.courses.push({
          courseId: data.courseId,
          sessionId: data.sessionId,
          step: 2
        });
      }
    }

    await student.save();

    res.json(student);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStudentCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const student = await StudentMain.findOneAndUpdate(
      {
        _id: studentId,
        "courses.courseId": new mongoose.Types.ObjectId(courseId)
      },
      {
        $set: {
          "courses.$.paymentMethod": req.body.paymentMethod,
          "courses.$.transactionId": req.body.transactionId,
          "courses.$.status": "completed",
          "courses.$.step": 4
        }
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(student);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET (resume flow later use)
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentMain.findById(id);

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    

    const updated = await StudentMain.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const data = await EnrollmentFlow.find()
      .populate("studentId")
      .lean();

    const formatted = data.map((flow) => {
      const student = flow.studentId || {};
      const item = flow.items?.[0] || {};

      return {
        id: student._id,    
flowId: flow._id ,

        registerDate: student.createdAt || null,
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",

        course: item.course?.courseName || "",
        courseBookingDate: flow.createdAt,

        llndStatus:
          flow.llnd?.status === "completed"
            ? "Completed"
            : "Not Completed",

        enrollmentForm: flow.enrollmentFormId
          ? "Completed" 
          : "Not Completed",

        paymentStatus:
          item.payment?.status === "success" ? "Paid" : "Unpaid",

        status: flow.status === "active" ? "Active" : "Inactive",

        lastLogin: student.lastLogin || "Never",
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("ERROR:", err); // 👈 MUST
    res.status(500).json({ error: err.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const flow = await EnrollmentFlow.findById(req.params.id);

    if (!flow) {
      return res.status(404).json({ message: "Flow not found" });
    }

    // 🔥 delete flow
    await EnrollmentFlow.findByIdAndDelete(req.params.id);

    // 🔥 delete student also
    await StudentMain.findByIdAndDelete(flow.studentId);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStudentStatus = async (req, res) => {
  try {
    
    const updated = await EnrollmentFlow.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status.toLowerCase() },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};