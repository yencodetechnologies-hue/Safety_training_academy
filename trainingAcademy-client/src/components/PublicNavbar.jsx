import "../styles/PublicNavbar.css";
import logo from "../assets/staLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function PublicNavbar({ courses = [] }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showResources, setShowResources] = useState(false);

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {});
  return (

    <header className="public-navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
          <img src={logo} alt="Safety Training Academy Logo" />
        </div>

        {/* NAV LINKS */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li onClick={() => { navigate("/") }}>Home</li>


            <li 
              onClick={() => setShowDropdown(prev => !prev)}
              onMouseEnter={() => {
                setShowDropdown(true);
                if (!activeCategory && Object.keys(groupedCourses).length > 0) {
                  setActiveCategory(Object.keys(groupedCourses)[0]);
                }
              }}
              onMouseLeave={() => setShowDropdown(false)}
              style={{ position: "relative" }}
            >Courses <i className="fa-solid fa-angle-down"></i>
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    width: "700px",
                    display: "flex",
                    background: "#0d1b2a",
                    color: "white",
                    borderRadius: "10px",
                    overflow: "hidden",
                    zIndex: 999,
                  }}
                >

                  {/* LEFT */}
                  <div style={{ width: "30%", padding: "15px", }}>
                    {Object.keys(groupedCourses).map((cat) => (
                      <div
                        key={cat}
                        onMouseEnter={() => setActiveCategory(cat)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          background: activeCategory === cat ? "#00bcd4" : "transparent"
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>

                  {/* RIGHT */}
                  <div style={{ width: "70%", padding: "15px" }}>
                    {activeCategory &&
                      groupedCourses[activeCategory].map((course) => (
                        <div
                          key={course._id}
                          onClick={() => navigate(`/course/${course.slug}-${course._id}`)} style={{
                            padding: "8px 0",
                            cursor: "pointer"
                          }}
                        >
                          {course.title}
                        </div>
                      ))}
                  </div>

                </div>
              )}
            </li>

            <li
              onClick={() => { navigate("/") }}
              onMouseEnter={() => setShowResources(true)}
              onMouseLeave={() => setShowResources(false)}
              style={{ position: "relative"}}
            >
              Resources
              <i className="fa-solid fa-angle-down"></i>
              {showResources && (
                <div className="resources-dropdown">
                  <div onClick={() => navigate("/forms")}>Forms</div>
                  <div onClick={() => navigate("/fees-refund")}>Fees & Refund</div>
                  <div onClick={() => navigate("/usi")}>
                    Unique Student Identifier (USI)
                  </div>
                  <div onClick={() => navigate("/code-of-practice")}>
                    Code of Practice ▸
                  </div>
                  <div onClick={() => navigate("/gallery")}>Gallery</div>
                </div>
              )}
            </li>


            <li onClick={() => { navigate("/about") }}>About</li>
            <li onClick={() => { navigate("/contact") }}>Contact</li>
          </ul>
        </div>

        {/* BUTTONS */}
        <div className={`nav-buttons ${mobileMenuOpen ? 'mobile-open' : ''}`}>


          <button className="combo-btn combo-btn-navbar"

          >
            Combo Courses
          </button>

          <button className="book-btn" onClick={() => { navigate("/book-now") }}>
            Book now
          </button>

          <button className="pub-voc-btn" onClick={() => { navigate("/voc") }}>
            VOC
          </button>

          <button className="login-btn">
            <Link className="login-link" to="/login">Login / Register</Link>
          </button>

          <button className="phone-btn phone-btn-navbar">
            📞 1300 976 097
          </button>

        </div>

        {/* MOBILE MENU ICON */}
        <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </div>

      </div>

    </header>
  );
}

export default PublicNavbar;