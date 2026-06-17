import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your login API call here

    if (formData.email && formData.password) {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* Left Section */}
        <div className="col-md-7 gym-banner d-none d-md-flex">
          <div className="overlay d-flex justify-content-center align-items-center w-100">
            <div className="text-white text-center">
              <h1 className="display-3 fw-bold">
                Gym Management System
              </h1>

              <p className="lead">
                Transform Your Body, Transform Your Life
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-5 d-flex justify-content-center align-items-center bg-white">
            <div className="login-card shadow p-4 rounded">
    
            <h2 className="fw-bold text-center mb-4">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-danger w-100">
                Login
              </button>

            </form>

            <p className="text-center mt-3">
              New Member?{" "}
              <Link to="/register">
                Register Here
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;