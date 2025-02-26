import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login", { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;
