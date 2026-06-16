import { useState } from "react";
import axios from "axios";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = {
            fullName: fullName,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                userData
            );

            alert(response.data.message);

            setFullName("");
            setEmail("");
            setPassword("");
        } catch(error){
            alert(error.response.data.message);
        }
};

return (
    <div>
        <h1>Registration Form</h1>

        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button type="submit">Register</button>
        </form>
    </div>
);
}

export default Register;