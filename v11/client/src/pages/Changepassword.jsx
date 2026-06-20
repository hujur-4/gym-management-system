import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Changepassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.newPassword) {
      alert("Please enter both email and new password");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:5000/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Password updated successfully");
        navigate("/");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error("Change password request failed:", err);
      alert("Could not reach server. Ensure backend is running and accessible.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-7 gym-banner d-none d-md-flex">
          <div className="overlay d-flex justify-content-center align-items-center w-100">
            <div className="text-center">
              <h1 className="display-3 text-white">Gym Management System</h1>
              <p className="lead text-white">Update Your Security</p>
            </div>
          </div>
        </div>

        <div className="col-md-5 d-flex justify-content-center align-items-center bg-dark">
          <div className="login-card bg-dark shadow-lg p-4 rounded" style={{width: "100%", maxWidth: "400px"}}>
            <h2 className="fw-bold text-center mb-4 main-color">Change Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label main-color">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Registered Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label main-color">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-join w-100" disabled={submitting}>
                {submitting ? "Updating..." : "Update Password"}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-white d-block mb-2">Remember your password?</span>
              <Link to="/Login" className="btn btn-join btn-sm text-decoration-none">Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;