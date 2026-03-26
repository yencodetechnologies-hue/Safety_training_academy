import { useState, useEffect, useRef } from "react";
import CourseSelection from "../components/course/CourseSelection";
import "../styles/BookNow.css";
import Payment from "../components/Payment";
import LLNDAssessment from "../components/llnd/LLNDAssessment";
import EnrollmentRegister from "../components/enrollmrntRegister/EnrollmentRegister";
import { useNavigate } from "react-router-dom";

function BookNow() {
    const navigate = useNavigate();
    const enrollRef = useRef(null);

    const [enrollmentType, setEnrollmentType] = useState("individual");
    const [step, setStep] = useState(1);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [enrollSection, setEnrollSection] = useState(1);
    const [isPaymentValid, setIsPaymentValid] = useState(false);
    const [triggerValidation, setTriggerValidation] = useState(false);

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const totalSteps = enrollmentType === "individual" ? 4 : 2;
    const progress = (step / totalSteps) * 100;

    useEffect(() => {
        if (step === 1) {
            setSelectedSession(null);
        }
    }, [step]);

    return (
        <section className="enroll-page">
            
            <h1 className="title">Student Enrollment</h1>
            <p className="subtitle">Complete all steps to enroll in your course</p>

            <div className="enroll-card">
                
                {/* Stepper */}
                <p className="home-pg-btn" style={{width:"fit-content",padding:"10px 20px"}} onClick={()=>{navigate("/")}}>
                    Back to Home
                </p>
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
                            <div className={`step ${step >= 2 ? "active" : ""}`}>💳</div>
                        )}

                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Step Content */}

                {step === 1 && (
                    <CourseSelection
                        enrollmentType={enrollmentType}
                        setEnrollmentType={setEnrollmentType}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                        selectedCourse={selectedCourse}
                        setSelectedCourse={setSelectedCourse}
                    />
                )}

                {step === 2 && (
                    <Payment
                        selectedCourse={selectedCourse}
                        setUserDetails={setUserDetails}
                        enrollmentType={enrollmentType}
                        setEnrollmentType={setEnrollmentType}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                        setIsValid={setIsPaymentValid}
                        triggerValidation={triggerValidation}
                    />
                )}

                {step === 3 && (
                    <LLNDAssessment
                        userDetails={userDetails}
                        onComplete={() => setStep(4)}
                    />
                )}

                {step === 4 && (
                    <EnrollmentRegister
                        ref={enrollRef}
                        userDetails={userDetails}
                        section={enrollSection}
                        setSection={setEnrollSection}
                    />
                )}

                {/* Buttons */}
                <div className={`next-wrapper ${step > 1 ? "has-prev" : ""}`}>

                    {step > 1 && step !== 3 && (
                        <button
                            className="prev-btn"
                            disabled={step === 4 && enrollSection === 1}
                            onClick={() => {
                                if (step === 4) {
                                    if (enrollSection > 1) {
                                        setEnrollSection(prev => prev - 1);
                                    }
                                    return; 
                                }

                                setStep(prev => prev - 1);
                            }}
                        >
                            Previous
                        </button>
                    )}

                    {step !== 3 && (
                        <button
                            className="next-btn"
                            disabled={
                                (step === 1 && !selectedSession) ||
                                (step === 2 && !isPaymentValid)
                            }
                            onClick={async () => {

                                if (step === 2) {
                                    setTriggerValidation(true);
                                }

                                // 🔥 Enrollment flow
                                if (step === 4) {

                                    if (enrollSection === 5) {

                                        if (!enrollRef.current) return;

                                        const error = await enrollRef.current.submitForm();

                                        if (error) {
                                            alert(error);
                                            return;
                                        }

                                        navigate("/enrollment-success", {
                                            state: { email: userDetails.email }
                                        });

                                        return;
                                    }

                                    setEnrollSection(prev => prev + 1);
                                    return;
                                }

                                // 🔥 Normal steps
                                if (step < totalSteps) {
                                    setStep(prev => prev + 1);
                                }
                            }}
                        >
                            {step === 4 && enrollSection === 5 ? "Submit" : "Next"}
                        </button>
                    )}

                </div>

            </div>
        </section>
    );
}

export default BookNow;

