import { Outlet, Navigate } from "react-router-dom";

// Helper to decode JWT token
const getRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        return decoded.role || null;
    } catch {
        return null;
    }
};

// Protects both dashboards — just checks token exists
function protectedNavigaton() {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" replace />;
}

// Protects admin routes — checks role === "admin"
export function AdminRoute() {
    const role = getRole();
    return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}

// Protects user routes — checks role is NOT admin
export function UserRoute() {
    const token = localStorage.getItem("token");
    const role = getRole();
    if (!token) return <Navigate to="/" replace />;
    return role !== "admin" ? <Outlet /> : <Navigate to="/" replace />;
}

export default protectedNavigaton;