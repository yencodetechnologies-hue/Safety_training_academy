import"../styles/Hero.css"
import sliderOne from "../assets/Slider1.jpeg"
import sliderTwo from "../assets/Slider2.jpeg"
import sliderThree from "../assets/Slider3.jpeg"

import { useState, useEffect } from "react" 
function Hero() {

    const images = [sliderOne, sliderTwo, sliderThree]

const [index,setIndex] = useState(0)

useEffect(()=>{

const interval = setInterval(()=>{

setIndex((prev)=>(prev+1) % images.length)

},4000)

return ()=> clearInterval(interval)

},[])

    return (
        <section className="hero" style={{backgroundImage:`url(${images[index]})`}}>

            <div className="hero-overlay"></div>

            <div className="hero-container">

                <div className="hero-left">

                    <h1>NATIONALLY RECOGNIZED CERTIFICATES</h1>

                    <p>
                        Get certified with credentials that are recognized across all states and territories.
                        Start your career with confidence.
                    </p>

                    <div className="hero-search">

                        <input
                            type="text"
                            placeholder="Search Courses..."
                        />

                        <button>Search Courses</button>

                    </div>

                </div>


                <div className="hero-card">

                    <h3>Course Enrolment</h3>

                    <p>
                        To enrol for a Course with Safety Training Academy, please complete our online
                        Enrolment form via the button below:
                    </p>

                    <button className="enrol-btn">ENROL NOW</button>

                    <button className="voc-btn">VOC</button>

                </div>

            </div>

        </section>
    );
}

export default Hero;