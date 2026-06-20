import { useState, useEffect } from "react";

const difficultyColor = {
  Easy: "#28a745",
  Moderate: "#ffc107",
  Hard: "#dc3545",
};

function Workouts() {
  const [workout, setWorkout] = useState(null);
  const [effectiveGoal, setEffectiveGoal] = useState("");
  const [activeDay, setActiveDay] = useState("");
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/workouts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setWorkout(data.workout);
          setEffectiveGoal(data.effectiveGoal);
          setActiveDay(data.workout.weeklyPlan[0]?.day || "");
        } else {
          setError(data.message || "Could not load workout plan");
        }
      } catch (err) {
        console.error("Fetch workout error:", err);
        setError("Server Error");
      } finally {
        setFetching(false);
      }
    };

    fetchWorkout();
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

  const currentDayPlan = workout.weeklyPlan.find((d) => d.day === activeDay);

  return (
    <div className="container-fluid">

      {/* Heading */}
      <div className="mb-3">
        <h4 className="fw-bold">🏋️ Workouts</h4>
        <p className="text-muted mb-0">
          Goal: <span className="fw-semibold" style={{ color: "#1a1a1a" }}>{effectiveGoal}</span>
          {" — "}
          <span className="text-muted">{workout.summary}</span>
        </p>
      </div>

      {/* Day Tabs */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {workout.weeklyPlan.map((d) => (
          <button
            key={d.day}
            className="btn px-3 py-2 fw-semibold"
            style={{
              backgroundColor: activeDay === d.day ? "#1a1a1a" : "#f8f9fa",
              color: activeDay === d.day ? "#22C55E" : "#555",
              border: activeDay === d.day ? "2px solid #1a1a1a" : "2px solid #dee2e6",
              minWidth: "100px",
            }}
            onClick={() => setActiveDay(d.day)}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Selected Day Plan */}
      {currentDayPlan && (
        <div className="card border-0 shadow-sm p-4">

          {/* Day Focus Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-0">{currentDayPlan.day}</h5>
              <span className="text-muted">{currentDayPlan.focus}</span>
            </div>
            <span
              className="badge px-3 py-2"
              style={{ backgroundColor: "#22C55E", color: "#1a1a1a" }}
            >
              {currentDayPlan.exercises.length} Exercises
            </span>
          </div>

          {/* Rest Day */}
          {currentDayPlan.exercises.length === 0 && (
            <div className="text-center py-5">
              <h2>😴</h2>
              <p className="text-muted">Rest day — let your muscles recover!</p>
            </div>
          )}

          {/* Exercise Table */}
          {currentDayPlan.exercises.length > 0 && (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr style={{ borderBottom: "2px solid #1a1a1a" }}>
                    <th className="fs-5 text-dark">Exercise</th>
                    <th className="fs-5 text-dark">Sets</th>
                    <th className="fs-5 text-dark">Reps</th>
                    <th className="fs-5 text-dark">Rest</th>
                    <th className="fs-5 text-dark">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDayPlan.exercises.map((ex, i) => (
                    <tr key={i}>
                      <td className="fw-semibold">{ex.name}</td>
                      <td>{ex.sets}</td>
                      <td>{ex.reps}</td>
                      <td>{ex.rest}</td>
                      <td>
                        <span
                          className="badge"
                          style={{ backgroundColor: difficultyColor[ex.difficulty] || "#6c757d" }}
                        >
                          {ex.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Workouts;