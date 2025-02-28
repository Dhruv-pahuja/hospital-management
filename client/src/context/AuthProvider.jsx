import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./authContext";
import { loginUser } from "../utils/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async (email, password) => {
        try {
            const res = await loginUser({ email, password });
            localStorage.setItem("user", JSON.stringify(res.data.token));
            setUser(res.data.token);
        } catch (error) {
            console.error("Login failed", error.response?.data?.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
