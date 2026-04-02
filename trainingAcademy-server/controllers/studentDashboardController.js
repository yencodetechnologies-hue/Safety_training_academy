const mongoose = require("mongoose");
const EnrollmentFlow = require("../models/EnrollmentFlows");

exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.params.id;

    if (!studentId || studentId === "null") {
      return res.status(400).json({ message: "Invalid student ID da 😅" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    // 🔥 CORRECT QUERY
    const flow = await EnrollmentFlow.findOne({ studentId })
      .populate("studentId");

    if (!flow) {
      return res.status(404).json({ message: "No enrollment data found" });
    }

    const response = {
      studentName: flow.studentId?.name,
      assessmentScore: flow.llnd?.score || 0,
      assessmentPassed: flow.llnd?.status === "completed",
      enrollmentFormApproved: flow.currentStep >= 3
    };

    res.json(response);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error da 😅" });
  }
};