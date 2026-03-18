import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/CourseDetails.css"
import TopNav from "../components/TopNav"
import TrustBar from "../components/TrustBar"
import PublicNavbar from "../components/PublicNavbar"
import CourseDetailsHero from "../components/CourseDetailHero"
import ViewDetailsLeft from "../components/ViewDetailsLeft"
import ViewDetailsRight from "../components/ViewDetailsRight"
import Footer from "../components/Footer"
function CourseDetails() {

    const { id } = useParams()

    const courseId = id.split("-").pop()

    const [course, setCourse] = useState(null)

    const [courses, setCourses] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:8000/api/courses/${courseId}`)
            .then(res => {
                setCourse(res.data)
            })

        axios.get(`http://localhost:8000/api/courses`)
            .then(res => {
                setCourses(res.data)
            })

    }, [courseId])

    if (!course) return <p>Loading...</p>

    return (

        <div className="course-details-public">

            <TopNav />
            <TrustBar />
            <PublicNavbar />
            <CourseDetailsHero course={course} />  
            <div className="course-details-content">
               <ViewDetailsLeft course={course} />
               <ViewDetailsRight course={course} />
            </div>
            <Footer/>

        </div>

    )

}

export default CourseDetails