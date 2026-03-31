const express = require("express");
const router = express.Router();

const {
  createStudent,
  updateStudent,
  getStudentById,
  updateStudentCourse,
  getAllStudents,
  updateStudentStatus,
  deleteStudent   // ✅ ADD THIS
} = require("../controllers/studentMainController");

router.post("/enrollment", createStudent);
router.put("/enrollment/:id", updateStudent);
// 🔥 GET
router.get("/enrollment/:id", getStudentById);
router.put("/enrollment/:studentId/:courseId", updateStudentCourse);
router.get("/",getAllStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.patch("/:id/status", updateStudentStatus);
router.delete("/:id", deleteStudent);



module.exports = router;

