import "../styles/Navbar.css"
function Navbar({ user }) {
    return (
        <section className="navbar">
            <div className="navbar-burger">
                <h2>{user?.role} Portal</h2>
                <div className="home-pg-btn">
                    <p>Go To Home Page</p>
                </div>
            </div>
            <div className="navbar-right">
                <div>
                    <span><i className="fa-regular fa-bell"></i></span>
                    <span><i className="fa-solid fa-gear"></i></span>
                    <span><i className="fa-regular fa-user"></i></span>
                </div>
            </div>
        </section>
    )

}

export default Navbar