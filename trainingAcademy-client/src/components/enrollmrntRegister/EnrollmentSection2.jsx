import { useState } from "react"
import "../../styles/EnrollmentSection2.css"

function EnrollmentSection2({ onNext, onPrev }) {

    const [form, setForm] = useState({
        usi: "",
        permission: false,
        staApplication: "",
    })

    const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

    const handleNext = () => {
        if (!form.staApplication) {
            alert("Please select USI application option.")
            return
        }

        if (form.staApplication === "no" && !form.usi.trim()) {
            alert("Please enter your USI.")
            return
        }

        if (onNext) onNext(form)
    }

    return (
        <div className="usi-page">

            {/* SECTION HEADER */}
            <div className="usi-section-header">
                <h2 className="usi-section-header-text">
                    SECTION 2 — UNIQUE STUDENT IDENTIFIER (USI)
                </h2>
            </div>

            {/* INFO CARD */}
            <div className="usi-info-card">
                <p className="usi-info-text">
                    From 1 January 2015, an RTO can be prevented from issuing nationally recognised VET
                    certification if you do not provide a USI. If you have not obtained a USI you can apply
                    for it directly. If you already have a USI, provide it below.
                </p>
                <p className="usi-info-text">
                    If you forgot your USI, you can retrieve it from the official USI site.
                </p>
            </div>

            {/* USI CARD */}
            <div className="usi-card">

                <h3 className="usi-card-title">Unique Student Identifier (USI)</h3>

                {/* INPUT + PERMISSION ROW */}
                <div className="usi-input-row">

                    {/* LEFT — USI Input */}
                    <div className="usi-input-col">
                        <label className="usi-label">Enter your USI</label>
                        <input
                            className="usi-input"
                            placeholder="10-character USI"
                            maxLength={10}
                            value={form.usi}
                            onChange={e => set("usi", e.target.value.toUpperCase())}
                        />
                        <p className="usi-hint">
                            If you don't have one, select "Apply through STA" below.
                        </p>
                    </div>

                    {/* RIGHT — Permission Checkbox */}
                    <div className="usi-permission-col">
                        <input
                            type="checkbox"
                            className="usi-permission-checkbox"
                            checked={form.permission}
                            onChange={e => set("permission", e.target.checked)}
                            id="usi-permission"
                        />
                        <label htmlFor="usi-permission" className="usi-permission-text">
                            I give permission for Safety Training Academy to access my Unique Student
                            Identifier (USI) for the purpose of recording my results.
                        </label>
                    </div>

                </div>

                {/* STA APPLICATION */}
                <div className="usi-sta-group">
                    <p className="usi-sta-label">
                        USI application through STA (if you do not already have one)
                        <span className="usi-required">*</span>
                    </p>
                    <div className="usi-radio-row">
                        <label className="usi-radio-label">
                            <input
                                type="radio"
                                name="usi-sta"
                                value="no"
                                checked={form.staApplication === "no"}
                                onChange={() => set("staApplication", "no")}
                                className="usi-radio"
                            />
                            No (I will provide my USI)
                        </label>
                        <label className="usi-radio-label">
                            <input
                                type="radio"
                                name="usi-sta"
                                value="yes"
                                checked={form.staApplication === "yes"}
                                onChange={() => set("staApplication", "yes")}
                                className="usi-radio"
                            />
                            Yes (Apply through STA)
                        </label>
                    </div>
                </div>

            </div>
            {form.staApplication === "yes" && (
    <div className="usi-extra-box">

        <h3 className="usi-extra-title">
            USI application through STA (if you do not already have one)
        </h3>

        <p className="usi-extra-text">
            If you would like STA to apply for a USI on your behalf, you must authorise us to do so and provide additional information.
        </p>

        {/* NAME */}
        <div className="usi-field">
            <label>[Name] — authorises Safety Training Academy to apply your USI *</label>
            <input className="usi-input" />
        </div>

        {/* CONSENT */}
        <label className="usi-checkbox-row">
            <input type="checkbox" />
            I have read and I consent to the collection, use and disclosure of my personal information to create my USI.
        </label>

        {/* CITY */}
        <div className="usi-row">
            <div>
                <label>Town/City of Birth *</label>
                <input className="usi-input" />
            </div>

            <div>
                <label>Overseas town or city where you were born *</label>
                <input className="usi-input" />
            </div>
        </div>

        {/* ID */}
        <p className="usi-subtitle">
            We will also need to verify your identity to create your USI.
        </p>

        <div className="usi-row">
            <select className="usi-input">
                <option>Select...</option>
                <option>Passport</option>
                <option>Driving Licence</option>
            </select>

            <input type="file" className="usi-input" />
        </div>

    </div>
)}

            {/* FOOTER NAV */}


        </div>
    )
}

export default EnrollmentSection2