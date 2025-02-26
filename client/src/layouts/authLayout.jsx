import useTokenStore from "../store";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
    const token = useTokenStore((state) => state.token);
    const role = localStorage.getItem("role");

    if (token) {
        if (role === "patient") return <Navigate to="/" replace />;
        if (role === "doctor") return <Navigate to="/dasboard/doctor" replace />;
        if (role === "staff" || role === "admin") return <Navigate to="/dashboard/admin" replace />;
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
};

export default AuthLayout;
