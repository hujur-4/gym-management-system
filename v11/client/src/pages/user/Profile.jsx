import { useState, useEffect } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    fitnessGoal: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch existing profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          // pre-fill form with existing data
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",
            address: data.address || "",
            emergencyContact: data.emergencyContact || "",
            bloodGroup: data.bloodGroup || "",
            fitnessGoal: data.fitnessGoal || "",
            photo: data.photo || "",
          });
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle photo upload — convert to base64
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.height || !formData.weight || !formData.fitnessGoal) {
      alert("Height, Weight and Fitness Goal are required!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile saved successfully!");
      } else {
        alert(data.message || "Error saving profile");
      }
    } catch (error) {
      console.error("Save profile error:", error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  return (
    <div className="container-fluid"   style={{ marginTop: "-15px" }}>

      {/* Page Heading */}
      <div className="mb-0">
        <h4 className="fw-bold" style={{ color: "#1a1a1a" }}>
          👤 My Profile
        </h4>
        <p className="text-muted">
          Fill in your details and save your profile
        </p>
      </div>

      <div className="row align-items-start">

        {/* Left — Photo + Basic Info */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm text-center p-4">

            {/* Photo */}
            <div className="mb-3">
              <img
                src={formData.photo || "https://via.placeholder.com/120?text=Photo"}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "3px solid #22C55E",
                }}
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="form-control form-control-sm mb-2"
              onChange={handlePhoto}
            />
            <small className="text-muted">Upload Profile Photo</small>

            {/* Name display */}
            <div className="mt-3">
              <h6 className="fw-bold mb-0">
                {formData.name || "Your Name"}
              </h6>
              <small className="text-muted">
                {formData.fitnessGoal || "No Goal Set"}
              </small>
            </div>

          </div>
        </div>

        {/* Right — Form */}
        <div className="col-md-9">
          <div className="card border-0 shadow-sm p-4 mt-0">
            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Age */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Enter Age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Gender</label>
                  <select
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Blood Group */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Blood Group</label>
                  <select
                    name="bloodGroup"
                    className="form-select"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                {/* Height */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Height (cm) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="height"
                    className="form-control"
                    placeholder="Enter Height in cm"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Weight */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Weight (kg) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="weight"
                    className="form-control"
                    placeholder="Enter Weight in kg"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Fitness Goal */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Fitness Goal <span className="text-danger">*</span>
                  </label>
                  <select
                    name="fitnessGoal"
                    className="form-select"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Fitness">Fitness</option>
                  </select>
                </div>

                {/* Emergency Contact */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Emergency Contact</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    className="form-control"
                    placeholder="Enter Emergency Contact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                </div>

                {/* Address */}
                <div className="col-md-12 mb-3">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Enter Address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* Save Button */}
              <div className="text-end">
                <button
                  type="submit"
                  className="btn px-5 py-2 fw-bold"
                  style={{
                    backgroundColor: "#22C55E",
                    color: "#1a1a1a",
                    border: "none",
                  }}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;