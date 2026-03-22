import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/landingPage/Hero";
import PublicNavbar from "../components/PublicNavbar";
import TopNav from "../components/landingPage/TopNav";
import TrustBar from "../components/landingPage/TrustBar";
import AdvertisementBar from "../components/landingPage/AdvertisementBar";
import CoursesSection from "../components/course/CoursesSection";
import AboutSection from "../components/landingPage/AboutSection";
import ClientsSection from "../components/landingPage/ClientsSection";
import ContactEnrollment from "../components/landingPage/ContactEnrollment";
import Footer from "../components/landingPage/Footer";

function LandingPage() {
    const [courses, setCourses] = useState([]);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/courses"); // change your API
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCourses();
}, []);
    return (
        <div>
            <TopNav/>
            <TrustBar/>
            <PublicNavbar courses={courses}/>
            <Hero />
            <AdvertisementBar/>
            <CoursesSection/>
            <AboutSection/>
            <ClientsSection/>
            <ContactEnrollment/>
            <Footer/>
        </div>
    );
}

export default LandingPage;