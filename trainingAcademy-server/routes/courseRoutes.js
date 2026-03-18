const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")
const parseFormData = require ("../middleware/parseFormData")

const { createCourse, getCourses, deleteCourse, updateCourse, getCourseById ,} =
require("../controllers/courseController")

router.get("/", getCourses)
router.post("/",upload.single("image"),parseFormData, createCourse)
router.put("/:id",upload.single("image"),parseFormData, updateCourse)
router.delete("/:id", deleteCourse)
router.get("/:id", getCourseById)

module.exports = router