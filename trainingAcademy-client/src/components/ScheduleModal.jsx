import "../styles/ScheduleModal.css"
import { useFormik } from "formik"
import axios from "axios"
import { useState, useEffect } from "react"

function CourseScheduleModal({ course, close }) {

    const [schedules, setSchedules] = useState([])


    // ---------------- FETCH SCHEDULES ----------------

    const fetchSchedules = async () => {

        try {

            const res = await axios.get(
                `http://localhost:8000/api/schedules/course/${course._id}`
            )

            setSchedules(res.data)

        }
        catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {

        if (course?._id) {
            fetchSchedules()
        }

    }, [course])


    // ---------------- DELETE SESSION ----------------

    const deleteSession = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this session?"
        )

        if (!confirmDelete) return

        try {

            await axios.delete(
                `http://localhost:8000/api/schedules/session/${id}`
            )

            fetchSchedules()

        }
        catch (err) {
            console.log(err)
        }

    }


    // ---------------- TOGGLE SESSION ----------------

    const toggleSession = async (id) => {

        try {

            await axios.patch(
                `http://localhost:8000/api/schedules/session/${id}`
            )

            fetchSchedules()

        }
        catch (err) {
            console.log(err)
        }

    }


    // ---------------- FORMIK ----------------

    const formik = useFormik({

        initialValues: {
            date: "",
            sessionType: "General",
            startTime: "",
            endTime: "",
            location: "",
            maxCapacity: ""
        },

        onSubmit: async (values) => {

            try {

                const payload = {

                    course: course._id,
                    date: values.date,

                    session: {
                        sessionType: values.sessionType,
                        startTime: values.startTime,
                        endTime: values.endTime,
                        location: values.location,
                        maxCapacity: values.maxCapacity
                    }

                }

                await axios.post(
                    "http://localhost:8000/api/schedules/session",
                    payload
                )

                formik.resetForm()

                fetchSchedules()

            }
            catch (err) {
                console.log(err)
            }

        }

    })



    return (

        <div className="csm-overlay">

            <form
                className="csm-container"
                onSubmit={formik.handleSubmit}
            >

                {/* HEADER */}

                <div className="csm-header">

                    <div>

                        <h2 className="csm-title">
                            Manage Course Dates
                        </h2>

                        <p className="csm-subtitle">
                            {course?.title}
                        </p>

                    </div>

                    <button
                        type="button"
                        className="csm-close-btn"
                        onClick={close}
                    >
                        ✕
                    </button>

                </div>



                {/* ADD NEW DATE */}

                <div className="csm-form-card">

                    <div className="csm-grid">


                        <div className="csm-field">

                            <label>Date *</label>

                            <input
                                type="date"
                                name="date"
                                min={new Date().toISOString().split("T")[0]}
                                value={formik.values.date}
                                onChange={formik.handleChange}
                            />

                        </div>



                        <div className="csm-field">

                            <label>Session Type</label>

                            <select
                                name="sessionType"
                                value={formik.values.sessionType}
                                onChange={formik.handleChange}
                            >

                                <option value="General">General</option>
                                <option value="Theory">Theory</option>
                                <option value="Practical">Practical</option>
                                <option value="Exam">Exam</option>

                            </select>

                        </div>



                        <div className="csm-field">

                            <label>Start Time</label>

                            <input
                                type="time"
                                name="startTime"
                                min={formik.values.date === new Date().toISOString().split("T")[0] ? new Date().toTimeString().slice(0,5) : "00:00"}
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                            />

                        </div>



                        <div className="csm-field">

                            <label>End Time</label>

                            <input
                                type="time"
                                name="endTime"
                                min={formik.values.startTime || (formik.values.date === new Date().toISOString().split("T")[0] ? new Date().toTimeString().slice(0, 5) : "00:00")}
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                            />

                        </div>



                        <div className="csm-field">

                            <label>Location</label>

                            <select
                                name="location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                            >

                                <option value="">Select</option>
                                <option value="Online">Online</option>
                                <option value="F2F">Face to Face</option>

                            </select>

                        </div>



                        <div className="csm-field">

                            <label>Max Capacity</label>

                            <input
                                type="number"
                                name="maxCapacity"
                                value={formik.values.maxCapacity}
                                onChange={formik.handleChange}
                            />

                        </div>
                        <div className="csm-field">

                            <label>Assign Teacher (Optional)</label>

                            <input
                                type="text"
                                name="teacher"
                                placeholder="Search teachers by name or email"
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="csm-add-date-btn"
                    >
                        + Add Date
                    </button>

                </div>



                {/* SCHEDULE LIST */}

                <div className="csm-schedule-section">

                    <h3 className="csm-section-title">

                        Scheduled Dates ({schedules.length})

                    </h3>

                    {schedules.length === 0 && (
                        <div className="csm-no-session">
                            No session available
                        </div>
                    )}

                    {schedules.map(schedule => (

                        <div
                            key={schedule._id}
                            className="csm-date-block"
                        >


                            {/* DATE HEADER */}

                            <div className="csm-date-header">

                                <span>

                                    {new Date(schedule.date).toDateString()}

                                </span>


                                <span className="csm-session-count">

                                    {schedule.sessions.length} session available

                                </span>

                            </div>



                            {/* SESSION LOOP */}

                            {schedule.sessions.map(session => {

                                const slotsLeft =
                                    (session.maxCapacity || 0) -
                                    (session.enrolledStudents || 0)

                                return (

                                    <div
                                        key={session._id}
                                        className="csm-session-card"
                                    >


                                        <div className="csm-session-left">

                                            <span className="csm-tag">

                                                {session.sessionType}

                                            </span>


                                            <span className="csm-time">

                                                ⏱ {session.startTime} - {session.endTime}

                                            </span>

                                        </div>



                                        <div className="csm-avl-slot">

                                            {slotsLeft} spots left

                                        </div>



                                        <div className="csm-session-right">

                                            <button
                                                type="button"
                                                className="csm-toggle"
                                                onClick={() => toggleSession(session._id)}
                                            >

                                                {session.status === "Active"
                                                    ? "Deactivate"
                                                    : "Activate"}

                                            </button>


                                            <button
                                                type="button"
                                                className="csm-delete"
                                                onClick={() => deleteSession(session._id)}
                                            >

                                                🗑

                                            </button>

                                        </div>

                                    </div>

                                )

                            })}

                        </div>

                    ))}

                </div>



                {/* FOOTER */}

                <div className="csm-footer">

                    <button
                        type="button"
                        className="csm-cancel-btn"
                        onClick={close}
                    >
                        Close
                    </button>

                </div>

            </form>

        </div>

    )

}

export default CourseScheduleModal