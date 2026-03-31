const EnrollmentFlow = require("../models/EnrollmentFlows");

// ✅ Create new flow
exports.createFlow = async (req, res) => {
  try {
    const { studentId, course,enrollmentType } = req.body;

    const flow = await EnrollmentFlow.create({
      studentId,
       enrollmentType: enrollmentType || "Individual", 
      items: [{
        course: {
          courseId: course.courseId,
          courseName: course.courseName,
          price: course.price
        }
      }],
      meta: {
        createdFromIP: req.ip,
        userAgent: req.headers["user-agent"]
      }
    });

    res.json(flow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Add another course
exports.addCourse = async (req, res) => {
  try {
    const { flowId, course } = req.body;

    await EnrollmentFlow.findByIdAndUpdate(flowId, {
      $push: {
        items: {
          course: {
            courseId: course.courseId,
            courseName: course.courseName,
            price: course.price
          }
        }
      }
    });

    res.json({ message: "Course added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Update payment
exports.updatePayment = async (req, res) => {
  try {
    const { flowId, courseId, payment } = req.body;

    await EnrollmentFlow.updateOne(
      { _id: flowId, "items.course.courseId": courseId },
      {
        $set: {
          "items.$.payment.status": payment.status,
          "items.$.payment.paymentId": payment.paymentId,
          "items.$.payment.amount": payment.amount,
          "items.$.payment.paidAt": new Date(),
          currentStep: 2
        }
      }
    );

    res.json({ message: "Payment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Save LLND
exports.saveLLND = async (req, res) => {
  try {
    const { flowId, ...rest } = req.body;

    if (!flowId) {
      return res.status(400).json({ error: "Flow ID missing" });
    }


    // 🔥 format answers
    const formattedAnswers = Object.entries(rest.answers || {}).flatMap(
      ([section, answers]) =>
        Object.entries(answers).map(([key, value]) => ({
          questionId: `${section}-${key}`,
          answer: value
        }))
    );

    const updated = await EnrollmentFlow.findByIdAndUpdate(
      flowId,
      {
        llnd: {
          answers: formattedAnswers,
          score: Number(rest.percentage) || 0,
          status: "completed",

          summary: {
            total: rest.total,
            correct: rest.correct,
            percentage: Number(rest.percentage),
            sections: rest.sections || []
          }
        },

        llndRaw: rest, // optional

        currentStep: 3
      },
      { new: true, runValidators: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Final Enrollment
exports.completeEnrollment = async (req, res) => {
  try {
    const { flowId } = req.body;

    await EnrollmentFlow.findByIdAndUpdate(flowId, {
      enrollment: {
        status: "enrolled",
        enrolledAt: new Date()
      },
      currentStep: 4
    });

    res.json({ message: "Enrollment completed 🎉" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get full flow (resume)
exports.getFlow = async (req, res) => {
  try {
    const { studentId } = req.query;

    const flow = await EnrollmentFlow.findOne({ studentId })
      .sort({ createdAt: -1 })
      .populate("studentId");

    res.json(flow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// controllers/enrollmentFlowController.js

exports.getLLNDResults = async (req, res) => {
  try {
    const data = await EnrollmentFlow.find({
      status: "active",
      "llnd.status": "completed"
    })
      .populate("studentId") // 🔥 IMPORTANT
      .lean();

    const formatted = data.map((flow) => {
      const student = flow.studentId;
      const item = flow.items?.[0] || {};

      return {
        id: flow._id,

        date: flow.createdAt.toISOString().split("T")[0], // ✅ date only

        student: student?.name,
        email: student?.email,
        phone: student?.phone,

        course: item.course?.courseName,
        bookingDate: flow.createdAt.toISOString().split("T")[0],

        // 🔥 FIX HERE
        type:
          student?.enrollmentType === "company"
            ? "Company"
            : "Individual",

        score: flow.llnd?.score || 0,
        result: flow.llnd?.status === "completed" ? "Passed" : "Failed",
        status: flow.llnd?.status === "completed" ? "Approved" : "Pending",

        sections: (flow.llnd?.summary?.sections || []).map(s => ({
          name: s.name,
          score: s.score,
          correct: s.correct || 0,   // ✅ ADD
          total: s.total || 0        // ✅ ADD
        }))
      };
    });

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};