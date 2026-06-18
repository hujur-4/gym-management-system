import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers, deleteMember } from "../api/member";

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
  if (status === "active") return "badge bg-success text-white";
  if (status === "inactive") return "badge bg-warning text-dark";
  return "badge bg-danger text-white";
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
    if (!confirm("Delete member?")) return;
    try {
      await deleteMember(id);
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Delete error", error);
      alert(error.message || "Delete failed");
    }
  }

  return (
    <div className="gym-dashboard-page">
      <div className="gym-dashboard-top mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <span className="badge bg-danger mb-3">Member Directory</span>
            <h1 className="display-6 text-white mb-2">All Gym Members</h1>
            <p className="text-white-50 mb-0">Browse the full member list and open member details.</p>
          </div>
          <div className="text-white text-end">
            <div className="small text-uppercase text-muted">Total members</div>
            <div className="fs-1 fw-bold">{members.length}</div>
          </div>
        </div>
      </div>

      <div className="card member-table-card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="mb-1">Member list</h5>
              <p className="text-white-50 small mb-0">Select a member to view or edit their profile.</p>
            </div>
            <Link to="/dashboard" className="btn btn-sm btn-outline-light">
              Back to dashboard
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading members...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-borderless table-hover align-middle mb-0 text-white">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No members found.
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member._id}>
                        <td>
                          <div className="fw-semibold text-white">{member.fullname}</div>
                          <div className="text-muted small">{member.phone || "—"}</div>
                        </td>
                        <td>{member.email}</td>
                        <td>{member.membershipType || "Standard"}</td>
                        <td>
                          <span className={statusBadge(member.status)}>{member.status}</span>
                        </td>
                        <td>{formatDate(member.membershipStartDate)}</td>
                        <td>{formatDate(member.membershipEndDate)}</td>
                        <td className="text-end">
                          <Link to={`/members/${member._id}`} className="btn btn-sm btn-outline-light me-2">
                            View
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(member._id)}
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
