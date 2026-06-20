import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMember, updateMember } from "../api/member";
import "./MembershipDetails.css";

export default function MembershipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    getMember(id).then(setMember);
  }, [id]);

  if (!member) {
    return (
      <div className="member-loading">
        <h3>Loading Member Details...</h3>
      </div>
    );
  }

  async function save(e) {
    e.preventDefault();
    await updateMember(id, member);
    alert("Member Updated Successfully!");
    navigate("/members");
  }

  return (
    <div className="member-page">
      <div className="member-card">
        <h2 className="member-title">Member Details</h2>

        <form onSubmit={save} className="member-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={member.fullname}
              onChange={(e) =>
                setMember({ ...member, fullname: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={member.email}
              onChange={(e) =>
                setMember({ ...member, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={member.phone || ""}
              onChange={(e) =>
                setMember({ ...member, phone: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Membership Type</label>
            <select
              value={member.membershipType}
              onChange={(e) =>
                setMember({
                  ...member,
                  membershipType: e.target.value,
                })
              }
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/members")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}