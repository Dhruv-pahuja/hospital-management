import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogoutBtn";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const DoctorDashboard = () => {
    const [publicAppointments, setPublicAppointments] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/publicAppointments/all`)
            .then(response => setPublicAppointments(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching public appointments:", error));
    }, []);

    const groupedAppointments = publicAppointments.reduce((acc, appt) => {
        acc[appt.department] = acc[appt.department] || [];
        acc[appt.department].push(appt);
        return acc;
    }, {});

    const updateStatus = (id, status) => {
        axios.put(`${API_URL}/api/publicAppointments/update-status/${id}`, { status })
            .then(() => {
                setPublicAppointments(prev =>
                    prev.map(appt => appt._id === id ? { ...appt, status } : appt)
                );
            })
            .catch(error => console.error("Error updating status:", error));
    };

    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
            <div className="absolute top-4 right-4">
                <LogoutButton />
            </div>

            <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

            {Object.entries(groupedAppointments).map(([department, appointments]) => (
                <div key={department} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
                    <h3 className="text-xl font-semibold mb-2">{department} Appointments</h3>
                    <table className="w-full border-collapse border border-gray-500">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border px-4 py-2">Patient Name</th>
                                <th className="border px-4 py-2">Contact</th>
                                <th className="border px-4 py-2">Doctor</th>
                                <th className="border px-4 py-2">Date</th>
                                {/* <th className="border px-4 py-2">Time</th> */}
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appt => (
                                <tr key={appt._id} className="border">
                                    <td className="border px-4 py-2">{appt.patientName}</td>
                                    <td className="border px-4 py-2">{appt.contactNumber}</td>
                                    <td className="border px-4 py-2">{appt.doctorId}</td>
                                    <td className="border px-4 py-2">{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                                    {/* <td className="border px-4 py-2">{appt.appointmentTime}</td> */}
                                    <td className="border px-4 py-2">{appt.status || "Pending"}</td>
                                    <td className="border px-4 py-2">
                                        {appt.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(appt._id, "completed")}
                                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                                    Complete
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(appt._id, "cancelled")}
                                                    className="bg-red-500 text-white px-2 py-1 rounded">
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default DoctorDashboard;
