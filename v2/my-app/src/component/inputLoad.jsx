import "../assets/cssStyle/inputLoad.css";
import axios from "axios";
import { useState } from "react";
function Form({ mode, setMode }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleFun = async (e) => {
    if (mode == "register") {
      e.preventDefault();
      const userData = {
        fullName: name,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "http://localhost:4567/api/register",
          userData
        );

        alert(response.data.message);

        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        alert(error.response.data.message);
      }
    }

  };
  return (
    <div id="form">
      <form onSubmit={handleFun}>

        {mode === "register" && (
          <>
            <label htmlFor="pa">Name</label>
            <br />
            <br />
            <input
              type="text"
              id="pa"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
          </>
        )}
        <label htmlFor="em">Email</label>
        <br />
        <br />
        <input
          type="email"
          id="em"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />


        {mode !== "forgot" && (
          <>
            <label htmlFor="pa">Password</label>
            <br />
            <br />
            <input
              type="password"
              id="pa"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
          </>
        )}

        <div id="buta">
          {mode === "login" && (
            <a id="forg" href="#" onClick={(e) => { e.preventDefault(); setMode("forgot"); }}>
              Forgot Password
            </a>
          )}

          <button id="but" type="submit">
            {mode === "login" && "Login"}
            {mode === "register" && "Register"}
            {mode === "forgot" && "Reset Password"}
          </button>

          {mode !== "forgot" && (
            <>
              <p>or</p>
              <button id="lwg" type="button">
                {mode === "login" ? "Login With Google" : "Register With Google"}
              </button>
            </>
          )}
        </div>

        <div className="register-text" style={{ marginTop: '20px' }}>
          {mode === "login" && (
            <>
              Don't have an account?
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("register"); }}> Register here</a>
            </>
          )}
          {mode === "register" && (
            <>
              Already have an account?
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); }}> Login here</a>
            </>
          )}
          {mode === "forgot" && (
            <>
              Remembered your password?
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); }}> Back to Login</a>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;