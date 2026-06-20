import { useState, useEffect } from "react";

// BMI category logic
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: "Underweight", health: "Poor", color: "#17a2b8" };
  if (bmi < 25)   return { category: "Normal",      health: "Good", color: "#28a745" };
  if (bmi < 30)   return { category: "Overweight",  health: "Average", color: "#ffc107" };
  return            { category: "Obese",           health: "Poor", color: "#dc3545" };
};

// Suggested goals based on BMI category
const getSuggestedGoals = (category, profileGoal) => {
  const allGoals = ["Weight Loss", "Weight Gain", "Fitness"];

  let suggested = [];
  if (category === "Underweight") suggested = ["Weight Gain"];
  if (category === "Normal")      suggested = ["Fitness"];
  if (category === "Overweight")  suggested = ["Weight Loss", "Fitness"];
  if (category === "Obese")       suggested = ["Weight Loss"];

  return suggested;
};

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiInfo, setBmiInfo] = useState(null);
  const [profileGoal, setProfileGoal] = useState("");
  const [suggestedGoals, setSuggestedGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [confirmedGoal, setConfirmedGoal] = useState(""); 
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch profile to auto-fill height & weight
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setHeight(data.height || "");
          setWeight(data.weight || "");
          setProfileGoal(data.fitnessGoal || "");
          setConfirmedGoal(data.fitnessGoal || "");
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  // Calculate BMI
  const handleCalculate = () => {
    if (!height || !weight) {
      alert("Please enter height and weight!");
      return;
    }

    const heightM = parseFloat(height) / 100; // cm to meters
    const weightKg = parseFloat(weight);
    const bmiValue = (weightKg / (heightM * heightM)).toFixed(1);
    const info = getBMICategory(parseFloat(bmiValue));

    setBmi(bmiValue);
    setBmiInfo(info);
    setSuggestedGoals(getSuggestedGoals(info.category, profileGoal));
    setSelectedGoal(""); // reset selection
  };

  // Save confirmed goal
  const handleConfirmGoal = async () => {
    if (!selectedGoal) {
      alert("Please select a goal first!");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fitnessGoal: selectedGoal }),
      });

      if (res.ok) {
        setConfirmedGoal(selectedGoal);
        alert(`Goal "${selectedGoal}" confirmed! Diet & Workouts updated.`);
      }
    } catch (error) {
      console.error("Save goal error:", error);
      alert("Server Error");
    } finally {
      setSaving(false);
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
    <div className="container-fluid">

      {/* Heading */}
      <div className="mb-3">
        <h4 className="fw-bold">📊 BMI Calculator</h4>
      </div>

      <div className="row">

        {/* Left — Calculator */}
        <div className="col-md-5 mb-4">
          <div className="card border-0 shadow-sm p-4">

            <h6 className="fw-bold mb-3">Enter Your Measurements</h6>

            {/* Height */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Height (cm)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Weight */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Weight (kg)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Calculate Button */}
            <button
              className="btn w-100 fw-bold py-2"
              style={{ backgroundColor: "#22C55E", color: "#1a1a1a" }}
              onClick={handleCalculate}
            >
              Calculate BMI
            </button>

          </div>

          {/* BMI Scale Reference */}
          <div className="card border-0 shadow-sm p-4 mt-3">
            <h6 className="fw-bold mb-3">BMI Scale</h6>
            {[
              { range: "Below 18.5", label: "Underweight", color: "#17a2b8" },
              { range: "18.5 - 24.9", label: "Normal", color: "#28a745" },
              { range: "25 - 29.9", label: "Overweight", color: "#ffc107" },
              { range: "30 and above", label: "Obese", color: "#dc3545" },
            ].map((item) => (
              <div key={item.label} className="d-flex justify-content-between align-items-center mb-2">
                <span
                  className="badge px-3"
                  style={{ backgroundColor: item.color }}
                >
                  {item.label}
                </span>
                <span className="text-muted small">{item.range}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right — Results */}
        <div className="col-md-7 mb-4">

          {/* BMI Result */}
          {bmi && bmiInfo && (
            <div
              className="card border-0 shadow-sm p-4 mb-4 text-center"
              style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
            >
              <h6 style={{ color: "#aaaaaa" }}>Your BMI Result</h6>

              {/* BMI Value */}
              <h1
                className="fw-bold my-3"
                style={{ fontSize: "64px", color: "#22C55E" }}
              >
                {bmi}
              </h1>

              <div className="d-flex justify-content-center gap-4">
                {/* Category */}
                <div>
                  <small style={{ color: "#aaaaaa" }}>Category</small>
                  <h5
                    className="fw-bold mt-1"
                    style={{ color: bmiInfo.color }}
                  >
                    {bmiInfo.category}
                  </h5>
                </div>

                {/* Divider */}
                <div style={{ width: "1px", backgroundColor: "#2a2a2a" }} />

                {/* Health Status */}
                <div>
                  <small style={{ color: "#aaaaaa" }}>Health Status</small>
                  <h5
                    className="fw-bold mt-1"
                    style={{ color: bmiInfo.color }}
                  >
                    {bmiInfo.health}
                  </h5>
                </div>
              </div>

            </div>
          )}

          {/* Goal Suggestion */}
          {bmi && (
            <div className="card border-0 shadow-sm p-4">

              <h6 className="fw-bold mb-3">🎯 Goal Suggestion</h6>

              {/* Profile Goal vs BMI */}
              <div className="d-flex gap-3 mb-3">
                <div
                  className="p-3 rounded flex-fill text-center"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <small className="text-muted">Your Profile Goal</small>
                  <h6 className="fw-bold mt-1 mb-0">{profileGoal || "Not Set"}</h6>
                </div>
                <div
                  className="p-3 rounded flex-fill text-center"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <small className="text-muted">BMI Says</small>
                  <h6
                    className="fw-bold mt-1 mb-0"
                    style={{ color: bmiInfo.color }}
                  >
                    {bmiInfo.category}
                  </h6>
                </div>
              </div>

              {/* Suggested Goals */}
              <p className="text-muted small mb-2">
                Suggested Goals based on your BMI:
              </p>

              <div className="d-flex gap-2 mb-3 flex-wrap">
                {suggestedGoals.map((goal) => (
                  <button
                    key={goal}
                    className="btn px-4 py-2 fw-semibold"
                    style={{
                      backgroundColor: selectedGoal === goal ? "#22C55E" : "#f8f9fa",
                      color: selectedGoal === goal ? "#1a1a1a" : "#555",
                      border: selectedGoal === goal
                        ? "2px solid #22C55E"
                        : "2px solid #dee2e6",
                    }}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    {goal}
                  </button>
                ))}
              </div>

              {/* Currently Confirmed Goal */}
              {confirmedGoal && (
                <div
                  className="p-2 rounded mb-3 text-center"
                  style={{ backgroundColor: "#d4edda" }}
                >
                  <small className="text-success fw-semibold">
                    ✅ Current Confirmed Goal: {confirmedGoal}
                  </small>
                </div>
              )}

              {/* Confirm Button */}
              <button
                className="btn w-100 fw-bold py-2"
                style={{ backgroundColor: "#1a1a1a", color: "#22C55E" }}
                onClick={handleConfirmGoal}
                disabled={saving || !selectedGoal}
              >
                {saving ? "Saving..." : "Confirm Goal"}
              </button>

            </div>
          )}

          {/* Show message before calculation */}
          {!bmi && (
            <div
              className="card border-0 shadow-sm p-4 text-center"
              style={{ height: "200px" }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                  <h1>📊</h1>
                  <p className="text-muted">
                    Enter your height and weight to calculate BMI
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BMI;