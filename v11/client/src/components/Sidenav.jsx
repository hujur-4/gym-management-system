  import { NavLink, useNavigate } from "react-router-dom";

  const navItems = [
    { path: "/user-dashboard", icon: "🏠", label: "Dashboard" },
    { path: "/user-dashboard/profile", icon: "👤", label: "Profile" },
    { path: "/user-dashboard/membership", icon: "💳", label: "Membership" },
    { path: "/user-dashboard/bmi", icon: "📊", label: "BMI Calculator" },
    { path: "/user-dashboard/workouts", icon: "🏋️", label: "Workouts" },
    { path: "/user-dashboard/diet", icon: "🥗", label: "Diet Plans" },
  ];

  function Sidenav() {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

    return (
      <div style={{
        width: "20%",
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0",
        position: "fixed",
        top: 0,
        left: 0,
      }}>

        {/* Logo */}
        <div>
          <div style={{
            textAlign: "center",
            padding: "20px 16px 30px",
            borderBottom: "1px solid #2a2a2a",
            marginBottom: "10px",
          }}>
          </div>

          {/* Nav Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/user-dashboard"}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 24px",
                textDecoration: "none",
                color: isActive ? "#22C55E" : "#cccccc",
                backgroundColor: isActive ? "#2a2a2a" : "transparent",
                borderLeft: isActive ? "3px solid #22C55E" : "3px solid transparent",
                transition: "all 0.2s ease",
                fontWeight: isActive ? "600" : "400",
              })}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2a2a2a";
                e.currentTarget.style.color = "#22C55E";
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.classList.contains("active");
                e.currentTarget.style.backgroundColor = isActive ? "#2a2a2a" : "transparent";
                e.currentTarget.style.color = isActive ? "#22C55E" : "#cccccc";
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ fontSize: "15px" }}>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: "0 16px 20px" }}>
          <div style={{
            borderTop: "1px solid #2a2a2a",
            paddingTop: "16px",
          }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "transparent",
                border: "1px solid #ff4444",
                color: "#ff4444",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff4444";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#ff4444";
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

      </div>
    );
  }

  export default Sidenav;