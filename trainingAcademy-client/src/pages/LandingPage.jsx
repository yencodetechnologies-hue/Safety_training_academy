import React from "react";
import Hero from "../components/Hero";
import PublicNavbar from "../components/PublicNavbar";
import TopNav from "../components/TopNav";
import TrustBar from "../components/TrustBar";
import AdvertisementBar from "../components/AdvertisementBar";
import CoursesSection from "../components/CoursesSection";
import AboutSection from "../components/AboutSection";
import ClientsSection from "../components/ClientsSection";
import ContactEnrollment from "../components/ContactEnrollment";
import Footer from "../components/Footer";
function LandingPage() {
    return (
        <div>
            <TopNav/>
            <TrustBar/>
            <PublicNavbar/>
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