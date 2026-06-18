import { Outlet, Navigate } from "react-router-dom";

function ProtectNav() {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectNav;