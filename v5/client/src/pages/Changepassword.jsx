import { useState } from "react";

function ChangePassword() {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          onChange={(e) =>
            setData({
              ...data,
              oldPassword: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setData({
              ...data,
              newPassword: e.target.value,
            })
          }
        />

        <br /><br />

        <button type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;