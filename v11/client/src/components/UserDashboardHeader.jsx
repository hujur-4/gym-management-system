import { useLocation } from "react-router-dom";

const pageTitles = {
  "/user-dashboard": "🏠 Dashboard",
  "/user-dashboard/profile": "👤 Profile",
  "/user-dashboard/membership": "💳 Membership",
  "/user-dashboard/bmi": "📊 BMI Calculator",
  "/user-dashboard/workouts": "🏋️ Workouts",
  "/user-dashboard/diet": "🥗 Diet Plans",
};

function UserDashboardHeader() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : {};

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav
      className="navbar fixed-top px-4"
      style={{
        backgroundColor: "#111111",
        borderBottom: "1px solid #2a2a2a",
        height: "65px",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* Left — Gym Name */}
        <span
          className="fw-bold fs-5"
          style={{ color: "#22C55E" }}
        >
          💪 Fitness GYM
        </span>

        {/* Center — Page Title */}
        <span
          className="fw-semibold fs-3 position-absolute start-50 translate-middle-x"
          style={{ color: "#ffffff" }}
        >
          {pageTitle}
        </span>

        {/* Right — Date + Username */}
        <div className="d-flex align-items-center gap-3">

          {/* Date */}
          <span
            className="d-none d-md-block small"
            style={{ color: "#aaaaaa" }}
          >
            📅 {today}
          </span>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "30px",
              backgroundColor: "#2a2a2a",
            }}
          />

          {/* Avatar + Username */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: "#22C55E",
                color: "#1a1a1a",
                fontSize: "14px",
              }}
            >
              {decoded.email ? decoded.email[0].toUpperCase() : "U"}
            </div>
            <span
              className="small"
              style={{ color: "#cccccc" }}
            >
              {decoded.email || "User"}
            </span>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default UserDashboardHeader;