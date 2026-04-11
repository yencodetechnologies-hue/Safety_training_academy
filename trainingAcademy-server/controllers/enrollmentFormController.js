const EnrollmentForm = require("../models/EnrollmentForm");
const EnrollmentFlow = require("../models/EnrollmentFlows");

const createEnrollmentForm = async (req, res) => {
  try {
    const data = req.body;

    const form = new EnrollmentForm({
      // BASIC
      studentId: data.userId,

      // SECTION 1
      personalDetails: {
        title: data.title,
        surname: data.surname,
        givenName: data.givenName,
        middleName: data.middleName,
        preferredName: data.preferredName,
        dob: data.dob,
        gender: data.gender,
        email: data.email,
        homePhone: data.homePhone,
        workPhone: data.workPhone,
        mobilePhone: data.mobilePhone,
      },

      address: {
        residential: {
          address: data.residentialAddress,
          suburb: data.suburb,
          state: data.state,
          postcode: data.postcode,
        },
        postal: {
          address: data.postalAddress,
          suburb: data.postalSuburb,
          state: data.postalState,
          postcode: data.postalPostcode,
        }
      },

      emergencyContact: {
        name: data.emergencyName,
        relationship: data.emergencyRelationship,
        contactNumber: data.emergencyContact,
        consent: data.emergencyPermission === "yes"
      },

      // SECTION 2
      education: {
        highestLevel: data.educationLevel,
        yearCompleted: data.yearCompleted,
        schoolName: data.schoolName,
        schoolState: data.schoolState,
        schoolPostcode: data.schoolPostcode,
        schoolCountry: data.schoolCountry,
      },

      qualifications: {
        hasQualification: data.hasQualifications === "yes",
        types: data.qualificationLevels
      },

      employment: {
        status: data.employmentStatus,
        details: {
          employerName: data.employerName,
          supervisorName: data.supervisorName,
          address: data.workplaceAddress,
          email: data.employerEmail,
          phone: data.employerPhone
        }
      },

      // SECTION 3
      trainingReason: data.trainingReason,

      language: {
        countryOfBirth: data.countryOfBirth,
        otherLanguage: data.otherLanguage
      },

      specialNeeds: {
        hasDisability: data.hasDisability === "yes",
        types: data.disabilityTypes,
        other: data.disabilityNotes
      },

      // FINAL
      enrollmentFormCompleted: true,
      enrollmentFormSubmittedAt: new Date()
    });

    await form.save();

        await EnrollmentFlow.findOneAndUpdate(
      { studentId: data.userId, status: "active" }, // find current flow
      {
        enrollmentFormId: form._id,
        currentStep: 4
      }
    );

    res.status(201).json({
      message: "Enrollment form submitted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getEnrollmentForms = async (req, res) => {
  try {
    const { studentId } = req.query; // ✅ query param எடுக்கிறோம்

    const query = studentId ? { studentId } : {};
    const forms = await EnrollmentForm.find(query).sort({ createdAt: -1 });

    res.status(200).json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching forms" });
  }
};

const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await EnrollmentForm.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = { createEnrollmentForm, getEnrollmentForms,updateEnrollmentStatus };

