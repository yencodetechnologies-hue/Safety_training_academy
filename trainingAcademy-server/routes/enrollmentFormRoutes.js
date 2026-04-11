const express = require("express");
const router = express.Router();
const { createEnrollmentForm ,getEnrollmentForms,updateEnrollmentStatus} = require("../controllers/enrollmentFormController");

router.post("/", createEnrollmentForm);
router.get("/", getEnrollmentForms);
router.patch("/:id/status", updateEnrollmentStatus);

module.exports = router;