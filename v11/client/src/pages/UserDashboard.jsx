import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import UserDashboardHeader from "../components/UserDashboardHeader";

function UserDashboard() {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidenav />

      {/* Right Side */}
      <div style={{ marginLeft: "20%", width: "80%" }}>

        {/* Header */}
        <UserDashboardHeader />

        {/* Page Content */}
        <div
          className="p-4"
          style={{
            marginTop: "65px",
            minHeight: "calc(100vh - 65px)",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;