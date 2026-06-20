import React, { useEffect, useMemo, useState } from "react";
import { getMembers, createMember, updateMember, deleteMember } from "../api/member";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
function formatDate(value) {
  

  if (!value) return "-";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const planOptions = [
  {
    type: "Standard",
    price: 40,
    duration: "Monthly",
    benefits: "Access to the gym floor, basic classes, and locker room.",
  },
  {
    type: "Premium",
    price: 65,
    duration: "Monthly",
    benefits: "Includes group classes, wellness workshops, and extended hours.",
  },
  {
    type: "VIP",
    price: 90,
    duration: "Monthly",
    benefits: "VIP lounge access, priority support, and premium trainer perks.",
  },
];

const planMap = planOptions.reduce((map, plan) => {
  map[plan.type] = plan;
  return map;
}, {});

export default function Dashboard() {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    membershipType: "Standard",
    membershipStartDate: "",
    membershipEndDate: "",
    status: "active",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // member being edited
  const [editSaving, setEditSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Load members error", e);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const selectedPlan = planMap[form.membershipType] || planMap.Standard;

  const summary = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.status === "active").length;
    const premium = members.filter((m) => m.membershipType === "Premium").length;
    const vip = members.filter((m) => m.membershipType === "VIP").length;
    const newMembers = members.filter((m) => {
      if (!m.createdAt) return false;
      const createdAt = new Date(m.createdAt);
      const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      return createdAt >= firstOfMonth;
    }).length;
    const revenue = members.reduce((sum, member) => {
      const plan = planMap[member.membershipType] || planMap.Standard;
      return sum + plan.price;
    }, 0);
    return { total, active, premium, vip, newMembers, revenue };
  }, [members]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return members.filter((member) => {
      const matchesStatus = filter === "all" || member.status === filter;
      const matchesSearch =
        query.length === 0 ||
        [member.fullname, member.email, member.phone, member.membershipType, member.status]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [members, filter, search]);

  function statusBadge(status) {
    if (status === "active") return "badge bg-success text-white";
    if (status === "inactive") return "badge bg-warning text-dark";
    return "badge bg-danger text-white";
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createMember(form);
      setForm({
        fullname: "",
        email: "",
        phone: "",
        membershipType: "Standard",
        membershipStartDate: "",
        membershipEndDate: "",
        status: "active",
        notes: "",
      });
      await load();
    } catch (err) {
      console.error("Create error", err);
      alert(err.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  function openEdit(member) {
    setEditing({ ...member });
  }

  function closeEdit() {
    setEditing(null);
  }

  async function saveEdit(e) {
    e.preventDefault();
    if (!editing) return;
    setEditSaving(true);
    try {
      await updateMember(editing._id, editing);
      await load();
      closeEdit();
    } catch (err) {
      console.error("Update error", err);
      alert(err.message || "Update failed");
    } finally {
      setEditSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete member?")) return;
    try {
      await deleteMember(id);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert(err.message || "Delete failed");
    }
  }

  return (
    <div className="gym-dashboard-page">
    <div className="gym-dashboard-top mb-4">
  <div className="d-flex justify-content-between align-items-start flex-wrap">

    {/* Left Side */}
    <div>
      <span
        className="badge mb-3"
        style={{
          backgroundColor: "#22C55E",
          color: "#fff",
        }}
      >
        Gym Membership
      </span>

      <h1 className="display-6 text-white mb-2">
        Membership Control Center
      </h1>

      <p className="text-white-50 mb-0">
        Focus on member growth, plan health, and gym retention from one clean dashboard.
      </p>
    </div>

    {/* Right Side Logout Button */}
    <button
      onClick={handleLogout}
      className="btn d-flex align-items-center gap-2"
      style={{
        backgroundColor: "#DC2626",
        color: "#fff",
        border: "none",
        padding: "12px 22px",
        borderRadius: "12px",
        fontWeight: "600",
      }}
    >
      Logout
    </button>

  </div>
</div>

      <div className="row gx-4 gy-4">
        <div className="col-xl-3">
          <div className="card feature-card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Dashboard features</h5>
              <p className="text-white-50 small mb-4">
                Quick access to the gym membership workflow and daily operations.
              </p>
              <ul className="list-unstyled text-white-75 mb-4 feature-list">
                <li className="mb-3">
                  <span className="badge bg-warning text-dark me-2">Track</span>
                  Active and expired subscriptions.
                </li>
                <li className="mb-3">
                  <span className="badge bg-info text-dark me-2">Review</span>
                  Member progress and renewals.
                </li>
                <li className="mb-3">
                  <span className="badge bg-secondary me-2">Search</span>
                  Filter by plan, status and contact.
                </li>
                <li>
                  <span className="badge bg-primary text-white me-2">Manage</span>
                  Quick actions for member records.
                </li>
              </ul>

              <div className="plan-details mb-4">
                <h6 className="text-white mb-3">Plan details</h6>
                <div className="list-group">
                  {planOptions.map((plan) => (
                    <div
                      key={plan.type}
                      className="list-group-item bg-transparent border rounded-3 mb-2 text-white-75"
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <strong>{plan.type}</strong>
                          <div className="small text-white-50">{plan.duration} • ₹{plan.price}/month</div>
                        </div>
                        <span className="badge bg-secondary">{plan.type}</span>
                      </div>
                      <p className="mb-0 small">{plan.benefits}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-grid gap-3">
                <Link to="/members" className="btn btn-lg" style={{backgroundColor:"#22C55E",color:"#fff",border:"none"}}>
                  View member directory
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-9">
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-xl-3">
              <div className="card metric-card shadow-sm border-0">
                <div className="card-body text-white">
                  <div className="metric-card-title text-white">Total members</div>
                  <div className="metric-card-value">{summary.total}</div>
                  <div className="text-white-50 small">All enrolled members</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card metric-card shadow-sm border-0">
                <div className="card-body text-black">
                  <div className="metric-card-title text-black">Active members</div>
                  <div className="metric-card-value">{summary.active}</div>
                  <div className="text-white-50 small">Current active subscriptions</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card metric-card shadow-sm border-0">
                <div className="card-body text-black">
                  <div className="metric-card-title text-black">New this month</div>
                  <div className="metric-card-value">{summary.newMembers}</div>
                  <div className="text-white-50 small">Members added this month</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card metric-card shadow-sm border-0">
                <div className="card-body text-black">
                  <div className="metric-card-title text-black">Revenue estimate</div>
                  <div className="metric-card-value">₹{summary.revenue}</div>
                  <div className="text-white-50 small">Monthly plan revenue</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12">
              <div className="card member-form-card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="mb-1">Add member</h5>
                  <p className="text-white-50 small mb-4">Quickly create a new gym membership profile.</p>
                  <form className="row g-3" onSubmit={handleCreate}>
                    <div className="col-md-6">
                      <label className="form-label small">Full name</label>
                      <input
                        className="form-control"
                        value={form.fullname}
                        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                        required
                        placeholder="Full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small">Phone</label>
                      <input
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small">Membership type</label>
                      <select
                        className="form-select"
                        value={form.membershipType}
                        onChange={(e) => setForm({ ...form, membershipType: e.target.value })}
                      >
                        <option>Standard</option>
                        <option>Premium</option>
                        <option>VIP</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <div className="alert alert-secondary py-3 mb-0">
                        <strong>{selectedPlan.type} plan:</strong> ${selectedPlan.price}/month — {selectedPlan.benefits}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small">Status</label>
                      <select
                        className="form-select"
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small">Start date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={form.membershipStartDate}
                        onChange={(e) => setForm({ ...form, membershipStartDate: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small">End date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={form.membershipEndDate}
                        onChange={(e) => setForm({ ...form, membershipEndDate: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small">Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Notes for trainer or membership details"
                      />
                    </div>
                    <div className="col-12 d-grid">
                      <button className="btn" type="submit" disabled={saving} style={{backgroundColor:"#22C55E",color:"#fff",border:"none"}}>
                        {saving ? "Adding member..." : "Add member"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Simple Bootstrap-style modal implemented in React */}
      {editing && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <form onSubmit={saveEdit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Member</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeEdit}></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small">Full name</label>
                        <input
                          className="form-control"
                          value={editing.fullname}
                          onChange={(e) => setEditing({ ...editing, fullname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          value={editing.email}
                          onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">Phone</label>
                        <input
                          className="form-control"
                          value={editing.phone || ""}
                          onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">Membership Type</label>
                        <select
                          className="form-select"
                          value={editing.membershipType || "Standard"}
                          onChange={(e) => setEditing({ ...editing, membershipType: e.target.value })}
                        >
                          <option>Standard</option>
                          <option>Premium</option>
                          <option>VIP</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small">Status</label>
                        <select
                          className="form-select"
                          value={editing.status || "active"}
                          onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small">Start date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={editing.membershipStartDate ? editing.membershipStartDate.slice(0, 10) : ""}
                          onChange={(e) => setEditing({ ...editing, membershipStartDate: e.target.value })}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small">End date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={editing.membershipEndDate ? editing.membershipEndDate.slice(0, 10) : ""}
                          onChange={(e) => setEditing({ ...editing, membershipEndDate: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label small">Notes</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={editing.notes || ""}
                          onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEdit} disabled={editSaving}>
                      Cancel
                    </button>
                    <button type="submit" className="btn" disabled={editSaving} style={{backgroundColor:"#22C55E",color:"#fff",border:"none"}}>
                      {editSaving ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}