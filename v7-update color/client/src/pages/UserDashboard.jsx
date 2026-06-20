import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  // Get user info from token
  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-danger">
          User Dashboard
        </h2>
        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Welcome Card */}
      <div className="card shadow p-4 mb-4">
        <h4 className="fw-bold">
          Welcome, {decoded.email} 👋
        </h4>
        <p className="text-muted">
          You are logged in as a <strong>Member</strong>
        </p>
      </div>

      {/* Info Cards */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow text-center p-4">
            <h5 className="fw-bold text-danger">Membership</h5>
            <p className="text-muted">View your membership details</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow text-center p-4">
            <h5 className="fw-bold text-danger">Schedule</h5>
            <p className="text-muted">View gym schedules</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow text-center p-4">
            <h5 className="fw-bold text-danger">Trainers</h5>
            <p className="text-muted">View available trainers</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserDashboard;