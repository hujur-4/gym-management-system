import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMember, updateMember } from "../api/member";

export default function MembershipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  useEffect(() => { getMember(id).then(setMember); }, [id]);

  if (!member) return <p>Loading...</p>;

  async function save(e) {
    e.preventDefault();
    await updateMember(id, member);
    alert("Saved");
    navigate("/dashboard");
  }

  return (
    <div>
      <h2>Member Details</h2>
      <form onSubmit={save}>
        <input value={member.fullname} onChange={e=>setMember({...member, fullname:e.target.value})} />
        <input value={member.email} onChange={e=>setMember({...member, email:e.target.value})} />
        <input value={member.phone||""} onChange={e=>setMember({...member, phone:e.target.value})} />
        <select value={member.membershipType} onChange={e=>setMember({...member, membershipType:e.target.value})}>
          <option>Standard</option>
          <option>Premium</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}