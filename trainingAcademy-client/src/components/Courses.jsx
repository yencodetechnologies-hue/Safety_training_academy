import "../styles/Courses.css";
import CreateCourseModal from "../components/CreateCourseModal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ScheduleModal from "./ScheduleModal";
function Courses() {

    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [editCourse, setEditCourse] = useState(null)
    const [search, setSearch] = useState("")
    const [openSchedule, setOpenSchedule] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {

            const res = await axios.get("http://localhost:8000/api/courses");

            setCourses(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        )

        if (!confirmDelete) return

        try {

            await axios.delete(`http://localhost:8000/api/courses/${id}`)

            fetchCourses()

        } catch (err) {
            console.log(err)
        }

    }
    const filteredCourses = courses.filter(course =>
        course.title?.toLowerCase().includes(search.toLowerCase()) ||
        course.courseCode?.toLowerCase().includes(search.toLowerCase()) ||
        course.category?.toLowerCase().includes(search.toLowerCase())
    )
    const categories = [...new Set(filteredCourses.map(course => course.category))]


    return (
        <section>
            <div className="courses-container">
                <div>
                    <h1>Courses Management</h1>
                    <p>Create and manage courses with detailed information.</p>
                </div>
                <div className="course-management-div">
                    <p>Add Categories</p>
                    <p>Manage Categories</p>
                    <p>Reorder Courses</p>
                    <p onClick={() => setShowModal(true)}>Create new Course</p>
                </div>

            </div>
            <div className="courses-search">
                <span className="search-icon">🔍</span>
                <input type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="courses-div">


                {categories.map((cat, index) => {

                    const categoryCourses = filteredCourses.filter(
                        course => course.category === cat
                    )

                    return (

                        <div key={index}>

                            <p className="courses-heading">
                                {cat} ({categoryCourses.length})
                            </p>

                            <div className="courses-list">

                                {categoryCourses.map((course) => (

                                    <div key={course._id} className="course-details">

                                        <div>

                                            <p className="course-catagory-btn">
                                                {course.courseCode}
                                            </p>

                                            <p>{course.title}</p>

                                            <div className="course-info">
                                                <p>{course.description?.join(", ")} |</p>
                                                <p>{course.duration} |</p>
                                                <p className="original-price">$ {course.originalPrice}</p>
                                                <p className="discount-price">$ {course.sellingPrice}</p>
                                            </div>

                                            <div className="course-bottom">

                                                <p className="enrolled-students">
                                                    {course.studentsEnrolled} Students enrolled
                                                </p>

                                                {course.combo && (
                                                    <p className={`combo-badge ${course.combo === "Premium" ? "premium-badge" : "standard-badge"}`}>
                                                        {course.combo}
                                                    </p>
                                                )}

                                            </div>

                                        </div>

                                        <div className="course-status">
                                            <p>Active</p>

                                            <div className="course-actions">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCourse(course)
                                                        setOpenSchedule(true)
                                                    }}
                                                >
                                                    📅
                                                </button>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => setEditCourse(course)}
                                                >
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(course._id)}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    );

                })}

            </div>
            {(showModal || editCourse) && (
                <CreateCourseModal
                    close={() => {
                        setShowModal(false)
                        setEditCourse(null)
                    }}
                    categories={categories}
                    refreshCourses={fetchCourses}
                    editCourse={editCourse}
                />
            )}
            {openSchedule && (
                <ScheduleModal
                    course={selectedCourse}
                    close={() => setOpenSchedule(false)}
                />
            )}
        </section>
    )
}
export default Courses