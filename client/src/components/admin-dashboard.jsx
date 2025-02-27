import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogoutBtn";

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [doctorsRes, patientsRes, inventoryRes] = await Promise.all([
                    axios.get("/api/staff/doctors", config),
                    axios.get("/api/staff/patients", config),
                    axios.get("/api/staff/inventory", config)
                ]);

                setDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data : []);
                setPatients(Array.isArray(patientsRes.data) ? patientsRes.data : []);
                setInventory(Array.isArray(inventoryRes.data) ? inventoryRes.data : []);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
            {/* Logout Button - Positioned at top right */}
            <div className="absolute top-4 right-4">
                <LogoutButton />
            </div>

            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Doctors Management */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Doctors</h3>
                    <ul>
                        {doctors.length ? doctors.map(doc => (
                            <li key={doc._id} className="border-b py-2">{doc.name} - {doc.department}</li>
                        )) : <p>No doctors found.</p>}
                    </ul>
                </div>

                {/* Patients Management */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Patients</h3>
                    <ul>
                        {patients.length ? patients.map(patient => (
                            <li key={patient._id} className="border-b py-2">{patient.name} - {patient.status}</li>
                        )) : <p>No patients found.</p>}
                    </ul>
                </div>

                {/* Inventory Management */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Inventory</h3>
                    <ul>
                        {inventory.length ? inventory.map(item => (
                            <li key={item._id} className="border-b py-2">{item.name} - {item.quantity}</li>
                        )) : <p>No inventory data.</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
