import "../../styles/EnrollmentComplete.css"
import { useNavigate } from "react-router-dom"

function EnrollmentComplete({ email = "your email" }) {

    const navigate = useNavigate()

    return (
        <div className="ec-page">

            <div className="ec-card">

                {/* GRADIENT HEADER */}
                <div className="ec-header">
                    <div className="ec-check-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ec-check-icon"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>

                    <h1 className="ec-title">
                        Thank you for your booking with Safety Training Academy
                    </h1>

                    <p className="ec-subtitle">
                        Your enrollment has been completed successfully.
                    </p>
                </div>

                {/* BODY */}
                <div className="ec-body">

                    <p className="ec-message">
                        A confirmation email has been sent to{" "}
                        <strong>{email}</strong>. Please check your inbox and follow the instructions.
                    </p>

                    <p className="ec-message">
                        If you need any assistance, please contact us.
                    </p>

                    <div className="ec-divider" />

                    <div className="ec-contact">
                        <p className="ec-regards">Kind regards,</p>
                        <p className="ec-org-name">Safety Training Academy</p>
                        <p className="ec-org-role">Training Team</p>
                        <p className="ec-org-phone">1300 976 097</p>
                        <a
                            href="mailto:info@safetytrainingacademy.edu.au"
                            className="ec-org-email"
                        >
                            info@safetytrainingacademy.edu.au
                        </a>
                    </div>

                    <button
                        className="ec-dashboard-btn"
                        onClick={() => navigate("/")}
                    >
                        Continue to Dashboard
                    </button>

                </div>

            </div>
        </div>
    )
}

export default EnrollmentComplete