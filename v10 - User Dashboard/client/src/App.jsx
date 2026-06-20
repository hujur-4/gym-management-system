import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MembershipDetails from "./pages/MembershipDetails";
import Members from "./pages/Members";
import ChangePassword from "./pages/Changepassword";
import Home from './pages/Home';
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/user/Profile";
import Membership from "./pages/user/Membership";
import BMI from "./pages/user/BMI";
import Workouts from "./pages/user/Workouts";
import Diet from "./pages/user/Diet";
import DashboardHome from "./pages/user/DashboardHome";
import ProtectNav, { AdminRoute, UserRoute } from "./pages/protectedNavigaton";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MembershipDetails />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="membership" element={<Membership />} />
            <Route path="bmi" element={<BMI />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="diet" element={<Diet />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;