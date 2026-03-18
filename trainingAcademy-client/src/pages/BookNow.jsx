import { useState } from "react";
import { useEffect } from "react";
import CourseSelection from "../components/CourseSelection";
import "../styles/BookNow.css";
import Payment from "../components/Payment";
import LLNDAssessment from "../components/LLNDAssessment"

function BookNow() {

    const [enrollmentType, setEnrollmentType] = useState("individual")
    const [step, setStep] = useState(1)
    const [selectedSession, setSelectedSession] = useState(null)
    const totalSteps = enrollmentType === "individual" ? 4 : 2
    const progress = (step / totalSteps) * 100

    useEffect(() => {

        if (step === 1) {
            setSelectedSession(null)
        }

    }, [step])

    return (

        <section className="enroll-page">

            <h1 className="title">Student Enrollment</h1>
            <p className="subtitle">Complete all steps to enroll in your course</p>

            <div className="enroll-card">

                {/* Stepper */}

                <div className="stepper">

                    <div className="stepper-wo-pbar">

                        <div className={`step ${step >= 1 ? "active" : ""}`}>📖</div>

                        {enrollmentType === "individual" && (
                            <>
                                <div className={`step ${step >= 2 ? "active" : ""}`}>💳</div>
                                <div className={`step ${step >= 3 ? "active" : ""}`}>📋</div>
                                <div className={`step ${step >= 4 ? "active" : ""}`}>📄</div>
                            </>
                        )}

                        {enrollmentType === "company" && (
                            <>
                                <div className={`step ${step >= 2 ? "active" : ""}`}>💳</div>
                            </>
                        )}

                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                </div>

                {/* Step Content */}

                {step === 1 && (
                    <CourseSelection
                        enrollmentType={enrollmentType}
                        setEnrollmentType={setEnrollmentType}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                    />
                )}

                {step === 2 && (
                    <Payment
                        enrollmentType={enrollmentType}
                        setEnrollmentType={setEnrollmentType}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                    />
                )}
                {step === 3 && (
                    <LLNDAssessment
                        onComplete={() => setStep(4)}
                    />
                )}

                {/* Next Button */}

                <div className={`next-wrapper ${step > 1 ? "has-prev" : ""}`}>

{step > 1 && step !== 3 && (

<button
className="prev-btn"
onClick={() => setStep(step - 1)}
>

Previous

</button>

)}

{step !== 3 && (

<button
className="next-btn"
disabled={!selectedSession && step === 1}
onClick={() => step < totalSteps && setStep(step + 1)}
>

Next

</button>

)}

</div>

            </div>

        </section>

    )

}

export default BookNow
