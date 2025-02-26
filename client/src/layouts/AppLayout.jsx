/* eslint-disable no-unused-vars */

import useTokenStore from '../store';
import { Link, Navigate, Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppLayout = () => {
    const { token, setToken } = useTokenStore((state) => state);


    return (
        <div>
            <Navbar />
            <main>
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
