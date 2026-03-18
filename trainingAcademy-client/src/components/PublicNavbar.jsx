import "../styles/PublicNavbar.css";
import logo from "../assets/staLogo.png";
import { Link } from "react-router-dom";
function PublicNavbar() {
  return (
    <header className="public-navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
         <img src={logo} alt="Safety Training Academy Logo" />
        </div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li>Home</li>
          <li>Courses</li>
          <li>Resources</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        {/* BUTTONS */}
        <div className="nav-buttons">

          <button className="combo-btn">
            Combo Courses
          </button>

          <button className="book-btn">
            Book now
          </button>

          <button className="pub-voc-btn">
            VOC
          </button>

          <button className="login-btn">
            <Link className="login-link"  to="/login">Login / Register</Link>
          </button>

          <button className="phone-btn">
            📞 1300 976 097
          </button>

        </div>

        {/* MOBILE MENU ICON */}
        <div className="mobile-menu">
          ☰
        </div>

      </div>

    </header>
  );
}

export default PublicNavbar;