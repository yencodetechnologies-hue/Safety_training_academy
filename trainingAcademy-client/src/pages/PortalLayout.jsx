import Navbar from "../components/landingPage/Navbar"
import Sidebar from "../components/Sidebar"
import AdminDashborad from "./AdminDashboard"
import { Outlet } from "react-router-dom"

function PortalLayout({ user }) {

    return (

        <div>

            <Navbar user={user} />

            <div style={{ display: "flex" }}>

                <Sidebar user={user} />

                <div style={{ flex: 1, padding: "30px", overflowY: "auto", height: "calc(100vh - 70px)",background:"#f5f3ff" }}>
                    <Outlet />
                </div>

            </div>

        </div>

    )

}

export default PortalLayout