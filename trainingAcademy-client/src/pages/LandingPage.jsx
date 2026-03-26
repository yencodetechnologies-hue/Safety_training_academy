import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/landingPage/Hero";
import PublicNavbar from "../components/PublicNavbar";
import TopNav from "../components/landingPage/TopNav";
import TrustBar from "../components/landingPage/TrustBar";
import PromoBar from "../components/landingPage/PromoBar";
import CoursesSection from "../components/course/CoursesSection";
import AboutSection from "../components/landingPage/AboutSection";
import ClientsSection from "../components/landingPage/ClientsSection";
import ContactEnrollment from "../components/landingPage/ContactEnrollment";
import Footer from "../components/landingPage/Footer";
import "../styles/LandingPage.css"
import { useLocation } from "react-router-dom";

function LandingPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://safety-training-academy-1ws0.onrender.com/api/courses"); // change your API
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);
  
  return (
    <div>
      <TopNav />
      <PublicNavbar courses={courses} />
      <Hero />

      <div className="adv-bar">
        <div>
          <PromoBar />
        </div>
        <div className="tru-bar">
          <TrustBar />
        </div>
      </div>
      <div id="courses">
        <CoursesSection />
      </div>
      <AboutSection />
      <ClientsSection />
      <ContactEnrollment />
      <Footer />
    </div>
  );
}

export default LandingPage;