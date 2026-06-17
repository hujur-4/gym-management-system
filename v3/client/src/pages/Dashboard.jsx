import React from "react";

function Dashboard() {
  return (
    <div className="bg-light min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3">
            💪 FitZone Gym
          </span>

          <button className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-4">
        <div
          className="p-5 rounded-4 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #ff512f, #dd2476)",
          }}
        >
          <h1 className="fw-bold">Welcome Admin</h1>
          <p className="fs-5">
            Manage your gym members, trainers, subscriptions,
            and workout schedules efficiently.
          </p>
        </div>

        {/* Statistics */}
        <div className="row mt-4 g-4">

          <div className="col-md-3">
            <div className="card border-0 shadow-lg text-center">
              <div className="card-body">
                <h1>👥</h1>
                <h2 className="fw-bold">350</h2>
                <p>Total Members</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-lg text-center">
              <div className="card-body">
                <h1>🏋️</h1>
                <h2 className="fw-bold">12</h2>
                <p>Trainers</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-lg text-center">
              <div className="card-body">
                <h1>💰</h1>
                <h2 className="fw-bold">₹1.2L</h2>
                <p>Monthly Revenue</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-lg text-center">
              <div className="card-body">
                <h1>✅</h1>
                <h2 className="fw-bold">180</h2>
                <p>Today's Attendance</p>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="card shadow-lg border-0 mt-5">
          <div className="card-body">
            <h3 className="fw-bold mb-4">Quick Actions</h3>

            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-primary">
                Add Member
              </button>

              <button className="btn btn-success">
                Manage Trainers
              </button>

              <button className="btn btn-warning text-white">
                Membership Plans
              </button>

              <button className="btn btn-danger">
                Attendance
              </button>

              <button className="btn btn-dark">
                Payments
              </button>
            </div>
          </div>
        </div>

        {/* Workout Schedule & Announcements */}
        <div className="row mt-5">

          <div className="col-md-8">
            <div className="card shadow-lg border-0">
              <div className="card-body">
                <h3 className="fw-bold mb-3">
                  Today's Workout Sessions
                </h3>

                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Time</th>
                      <th>Program</th>
                      <th>Trainer</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>6:00 AM</td>
                      <td>Cardio Blast</td>
                      <td>Rahul</td>
                    </tr>

                    <tr>
                      <td>8:00 AM</td>
                      <td>Weight Training</td>
                      <td>Arjun</td>
                    </tr>

                    <tr>
                      <td>6:00 PM</td>
                      <td>Zumba</td>
                      <td>Priya</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg border-0">
              <div className="card-body">
                <h3 className="fw-bold mb-3">
                  Gym Notices
                </h3>

                <ul className="list-group">
                  <li className="list-group-item">
                    🔥 Summer Fitness Challenge Starts Monday
                  </li>

                  <li className="list-group-item">
                    🎯 New Personal Trainer Joined
                  </li>

                  <li className="list-group-item">
                    💪 20% Discount on Annual Membership
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;

