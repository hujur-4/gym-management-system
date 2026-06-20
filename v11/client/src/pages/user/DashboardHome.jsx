import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const planDetails = {
  standard: { name: "Basic" },
  premium: { name: "Standard" },
  vip: { name: "Premium" },
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: "Underweight", color: "#17a2b8" };
  if (bmi < 25)   return { category: "Normal", color: "#28a745" };
  if (bmi < 30)   return { category: "Overweight", color: "#ffc107" };
  return            { category: "Obese", color: "#dc3545" };
};

function DashboardHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [membership, setMembership] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [diet, setDiet] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, membershipRes, workoutRes, dietRes] = await Promise.all([
          fetch("http://localhost:5000/api/profile", { headers }),
          fetch("http://localhost:5000/api/membership", { headers }),
          fetch("http://localhost:5000/api/workouts", { headers }),
          fetch("http://localhost:5000/api/diet", { headers }),
        ]);

        if (profileRes.ok) setProfile(await profileRes.json());
        if (membershipRes.ok) setMembership(await membershipRes.json());
        if (workoutRes.ok) setWorkout(await workoutRes.json());
        if (dietRes.ok) setDiet(await dietRes.json());

      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchAll();
  }, []);

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0;
    const diff = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getTodaysWorkout = () => {
    if (!workout?.workout?.weeklyPlan) return null;
    const todayName = new Date().toLocaleDateString("en-IN", { weekday: "long" });
    return workout.workout.weeklyPlan.find((d) => d.day === todayName);
  };

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  const bmiValue = profile?.height && profile?.weight
    ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
    : null;
  const bmiInfo = bmiValue ? getBMICategory(parseFloat(bmiValue)) : null;
  const todaysWorkout = getTodaysWorkout();
  const planName = membership ? (planDetails[membership.membershipType?.toLowerCase()]?.name || membership.membershipType) : null;

  return (
    <div className="container-fluid">

      {/* Welcome Banner */}
      <div
        className="card border-0 shadow-sm p-4 mb-4 d-flex flex-row align-items-center"
        style={{ backgroundColor: "#1a1a1a", color: "#fff", gap: "20px" }}
      >
        <img
          src={profile?.photo || "https://via.placeholder.com/80?text=U"}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover", border: "3px solid #22C55E" }}
        />
        <div>
          <h4 className="fw-bold mb-1">
            Welcome back, {profile?.name?.trim() || "there"} 👋
          </h4>
          <span className="badge px-3 py-2" style={{ backgroundColor: "#22C55E", color: "#1a1a1a" }}>
            🎯 Goal: {profile?.fitnessGoal || "Not Set"}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row">

        {/* Membership Card */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">💳 Membership</h6>
              <span
                role="button"
                className="small fw-semibold"
                style={{ color: "#1a1a1a", cursor: "pointer" }}
                onClick={() => navigate("/user-dashboard/membership")}
              >
                View More →
              </span>
            </div>

            {membership ? (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Current Plan</small>
                  <h5 className="fw-bold mb-0">{planName}</h5>
                  <span className={`badge bg-${membership.status === "active" ? "success" : "warning"}`}>
                    {membership.status}
                  </span>
                </div>
                <div className="text-center">
                  <small className="text-muted">Days Left</small>
                  <h3 className="fw-bold mb-0" style={{ color: "#22C55E" }}>
                    {getDaysRemaining(membership.membershipEndDate)}
                  </h3>
                </div>
              </div>
            ) : (
              <p className="text-muted mb-0">No membership found</p>
            )}
          </div>
        </div>

        {/* BMI Card */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">📊 BMI</h6>
              <span
                role="button"
                className="small fw-semibold"
                style={{ color: "#1a1a1a", cursor: "pointer" }}
                onClick={() => navigate("/user-dashboard/bmi")}
              >
                View More →
              </span>
            </div>

            {bmiValue ? (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Category</small>
                  <h5 className="fw-bold mb-0" style={{ color: bmiInfo.color }}>
                    {bmiInfo.category}
                  </h5>
                </div>
                <h2 className="fw-bold mb-0">{bmiValue}</h2>
              </div>
            ) : (
              <p className="text-muted mb-0">Complete profile to see BMI</p>
            )}
          </div>
        </div>

        {/* Today's Workout Card */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">🏋️ Today's Workout</h6>
              <span
                role="button"
                className="small fw-semibold"
                style={{ color: "#1a1a1a", cursor: "pointer" }}
                onClick={() => navigate("/user-dashboard/workouts")}
              >
                View More →
              </span>
            </div>

            {todaysWorkout ? (
              <>
                <h5 className="fw-bold mb-1">{todaysWorkout.day}</h5>
                <p className="text-muted mb-2">{todaysWorkout.focus}</p>
                <span className="badge px-3 py-2" style={{ backgroundColor: "#22C55E", color: "#1a1a1a" }}>
                  {todaysWorkout.exercises.length} Exercises
                </span>
              </>
            ) : (
              <p className="text-muted mb-0">No workout plan found</p>
            )}
          </div>
        </div>

        {/* Diet Snapshot Card */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">🥗 Diet Snapshot</h6>
              <span
                role="button"
                className="small fw-semibold"
                style={{ color: "#1a1a1a", cursor: "pointer" }}
                onClick={() => navigate("/user-dashboard/diet")}
              >
                View More →
              </span>
            </div>

            {diet ? (
              <div className="d-flex justify-content-between text-center">
                <div>
                  <small className="text-muted">Calories</small>
                  <h5 className="fw-bold mb-0">{diet.diet.caloriesTarget}</h5>
                </div>
                <div>
                  <small className="text-muted">Protein</small>
                  <h5 className="fw-bold mb-0">{diet.diet.proteinTarget}</h5>
                </div>
                <div>
                  <small className="text-muted">Water</small>
                  <h5 className="fw-bold mb-0">💧 {diet.diet.waterTarget}</h5>
                </div>
              </div>
            ) : (
              <p className="text-muted mb-0">No diet plan found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardHome;