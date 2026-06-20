
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
            navigate("/user-dashboard");
        }
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* Left Banner */}
        <div className="col-md-7 gym-banner d-none d-md-flex">
          <div className="overlay d-flex justify-content-center align-items-center w-100">
            <div className="text-center text-white">
              <h1 className="display-3 fw-bold">
                Prime Fitness GYM
              </h1>
              <p className="lead">
                Transform Your Body, Transform Your Life
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="col-md-5 d-flex justify-content-center align-items-center bg-dark">
          <div className="login-card bg-dark shadow-lg p-5">

            <div className="text-center mb-4">
              <h2 className="fw-bold main-color">
                Member Login
              </h2>
              <p className="text-white">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="form-label fw-semibold main-color">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold main-color">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <div className="text-end mt-2">
                  <Link
                    to="/change-password"
                    className="text-decoration-none main-color fw-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-join w-100"
                disabled={submitting}
              >
                {submitting ? "Logging In..." : "Login"}
              </button>

              <div className="text-center mt-4">
                <span className="text-muted">
                  Don't have an account?
                </span>{" "}
                <Link
                  to="/register"
                  className="text-decoration-none fw-bold main-color"
                >
                  Register Here
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
