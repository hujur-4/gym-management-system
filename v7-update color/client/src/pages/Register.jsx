import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.fullname ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: user.fullname,
            email: user.email,
            password: user.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0 bg-dark text-white"
        style={{ width: "450px", borderRadius: "20px" }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <h2 className="fw-bold main-color">
              Gym Registration
            </h2>
            <p style={{ color: 'white' }}>
              Create your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                className="form-control"
                placeholder="Enter Full Name"
                value={user.fullname}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={user.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-join w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <div className="text-center mt-3">
              <p>
              Already have an account?{" "}
              <Link
                to="/Login"
                className="text-decoration-none fw-bold main-color"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;