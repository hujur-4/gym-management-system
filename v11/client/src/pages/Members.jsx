import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers, deleteMember } from "../api/member";
import'./Members.css';
function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadge(status) {
  if (status === "active") return "badge status-active";
  if (status === "inactive") return "badge status-inactive";
  return "badge status-cancelled";
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMembers() {
      setLoading(true);

      try {
        const data = await getMembers();
        setMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Load members error", error);
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete member?")) return;

    try {
      await deleteMember(id);

      setMembers((prev) =>
        prev.filter((member) => member._id !== id)
      );
    } catch (error) {
      console.error("Delete error", error);
      alert(error.message || "Delete failed");
    }
  }

  return (
    <div className="gym-dashboard-page">
      {/* HERO SECTION */}
      <div className="gym-dashboard-top mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <span
              className="badge mb-3"
              style={{
                backgroundColor: "#22C55E",
                color: "#fff",
              }}
            >
              Member Directory
            </span>

            <h1 className="display-5 fw-bold text-white">
              All Gym Members
            </h1>

            <p className="text-secondary mb-0">
              Browse and manage all registered gym members.
            </p>
          </div>

          <div className="text-end">
            <div className="small text-secondary">
              Total Members
            </div>

            <div
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                color: "#22C55E",
              }}
            >
              {members.length}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="card member-table-card border-0 shadow-lg">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-white mb-1">
                Member List
              </h4>

              <p className="text-secondary mb-0">
                Select a member to view details.
              </p>
            </div>

            <Link
              to="/admin-dashboard"
              className="btn btn-outline-success"
            >
              Back to Dashboard
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-white py-5">
              Loading members...
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table members-table align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {members.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center text-secondary py-5"
                      >
                        No members found.
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr >
                        <td>
                          <div className="fw-bold text-black">
                            {member.fullname}
                          </div>

                          <small className="text-secondary">
                            {member.phone || "-"}
                          </small>
                        </td>

                        <td>
                          <div className="fw-bold text-black">
                            {member.email}
                          </div>
                        </td>

                        <td>
                          <span className="plan-badge">
                            {member.membershipType || "Standard"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={statusBadge(
                              member.status
                            )}
                          >
                            {member.status}
                          </span>
                        </td>

                        <td>
                          <div className="fw-bold text-black">
                          {formatDate(
                            member.membershipStartDate
                          )}
                          </div>
                        </td>
                        
                        
                        <td>
                          <div className="fw-bold text-black">
                          {formatDate(
                            member.membershipEndDate
                          )}
                          </div>
                        </td>

                        <td className="text-end">
                          <Link
                            to={`/members/${member._id}`}
                            className="btn btn-view btn-sm me-2"
                          >
                            View
                          </Link>

                          <button
                            className="btn btn-delete btn-sm"
                            onClick={() =>
                              handleDelete(member._id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}