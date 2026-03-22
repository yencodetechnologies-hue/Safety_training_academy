const express = require("express");
const router = express.Router();
const { createEnrollmentForm ,getEnrollmentForms} = require("../controllers/enrollmentFormController");

router.post("/", createEnrollmentForm);
router.get("/", getEnrollmentForms);

module.exports = router;