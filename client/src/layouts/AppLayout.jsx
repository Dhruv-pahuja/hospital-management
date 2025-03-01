/* eslint-disable no-unused-vars */

import useTokenStore from '../store';
import { Link, Navigate, Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppLayout = () => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main>
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
