// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// function App() {
//    const [count,setCount]=useState(0);
//    const[message,setMessage]=useState("Welcome");

//    const[status,setStatus]=useState(false);

//    const[name,setName]=useState("");

//   return (
//     <div>
//     <h1>Count:{count}</h1>
//     <button onClick={()=>setCount(count+1)}>
//       Increase
//     </button>


//     <button onClick={()=>setCount(count-1)}>
//       Decrease
//     </button>



//     <h1>{message}</h1>
//     <button onClick={()=>setMessage("Hello Students")}>
//       change Message
//     </button>



//     <h1>{status ? "ON":"OFF"}</h1>
//     <button onClick={()=>setStatus(!status)}>
//       Toggle
//     </button>
//     <br/>
//     <br/>



//     <input 
//     type="text"
//     placeholder="Enter Name"
//     onChange={(e) => setName(e.target.value)}/>
//     <h2>Hello {name}</h2>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MembershipDetails from "./pages/MembershipDetails";
import Members from "./pages/Members";
import ChangePassword from "./pages/Changepassword";
import ProtectNav from "./pages/protectedNavigaton";
function App() {
  const token=localStorage.getItem("token");
//  if(token){
  //      <Route path="/dashboard" element={<Dashboard />} />

        {/* Members List Page */}
        //<Route path="/members" element={<Members />} />

      //  {/* Member Details Page */}
    //    <Route path="/members/:id" element={<MembershipDetails />} />

  //}
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Login Page */}
        <Route path="/" element={<Login />} />
        
        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard Page */}
        
        {/* Change Password Page */}
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
        <Route element={<ProtectNav />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:id" element={<MembershipDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;