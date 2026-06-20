import { useState, useEffect } from "react";

function Diet() {
  const [diet, setDiet] = useState(null);
  const [effectiveGoal, setEffectiveGoal] = useState("");
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/diet", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setDiet(data.diet);
          setEffectiveGoal(data.effectiveGoal);
        } else {
          setError(data.message || "Could not load diet plan");
        }
      } catch (err) {
        console.error("Fetch diet error:", err);
        setError("Server Error");
      } finally {
        setFetching(false);
      }
    };

    fetchDiet();
  }, []);

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-muted">{error}</h5>
      </div>
    );
  }

  const mealSections = [
    { key: "breakfast", label: "🍳 Breakfast" },
    { key: "lunch", label: "🍛 Lunch" },
    { key: "dinner", label: "🍽️ Dinner" },
    { key: "snacks", label: "🥪 Snacks" },
  ];

  return (
    <div className="container-fluid">

      <div className="mb-3">
        <h4 className="fw-bold">🥗 Diet Plan</h4>
        <p className="text-muted mb-0">
          Goal: <span className="fw-semibold" style={{ color: "#1a1a1a" }}>{effectiveGoal}</span>
          {" — "}
          <span className="text-muted">{diet.focus}</span>
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-sm p-4 text-center h-100"
            style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
          >
            <small style={{ color: "#aaaaaa" }}>Calories Target</small>
            <h2 className="fw-bold mt-1" style={{ color: "#22C55E" }}>
              {diet.caloriesTarget}
            </h2>
            <small style={{ color: "#aaaaaa" }}>kcal / day</small>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-sm p-4 text-center h-100"
            style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
          >
            <small style={{ color: "#aaaaaa" }}>Protein Target</small>
            <h2 className="fw-bold mt-1" style={{ color: "#22C55E" }}>
              {diet.proteinTarget}
            </h2>
            <small style={{ color: "#aaaaaa" }}>per day</small>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-sm p-4 text-center h-100"
            style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
          >
            <small style={{ color: "#aaaaaa" }}>Water Intake</small>
            <h2 className="fw-bold mt-1" style={{ color: "#22C55E" }}>
              💧 {diet.waterTarget}
            </h2>
          </div>
        </div>
      </div>

      <div className="row">
        {mealSections.map((meal) => (
          <div className="col-md-6 mb-4" key={meal.key}>
            <div className="card border-0 shadow-sm p-4 h-100">
              <h6 className="fw-bold mb-3">{meal.label}</h6>
              <ul className="list-unstyled mb-0">
                {diet.meals[meal.key]?.map((item, i) => (
                  <li
                    key={i}
                    className="d-flex align-items-center mb-2 pb-2"
                    style={{ borderBottom: i !== diet.meals[meal.key].length - 1 ? "1px solid #eee" : "none" }}
                  >
                    <span style={{ color: "#22C55E", marginRight: "8px" }}>●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Diet;