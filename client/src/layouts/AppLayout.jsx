/* eslint-disable no-unused-vars */

import useTokenStore from '../store';
import { Link, Navigate, Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

const AppLayout = () => {
    const { token, setToken } = useTokenStore((state) => state);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    

    return (
        <div>
            <Navbar />
            <main>
                <Outlet /> 
            </main>
        </div>
    );
}

export default AppLayout;
