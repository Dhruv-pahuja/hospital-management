import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogoutBtn";

const PatientDashboard = () => {
    const [medicalData, setMedicalData] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const medicalResponse = await axios.get("/api/patient/medical-data", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMedicalData(medicalResponse.data);
            } catch (error) {
                console.error("Error fetching medical data:", error);
            }

            try {
                const appointmentResponse = await axios.get("/api/patient/appointments", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(Array.isArray(appointmentResponse.data) ? appointmentResponse.data : []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
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

            <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

            {/* Medical Data */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
                <h3 className="text-xl font-semibold mb-2">Medical Data</h3>
                {medicalData ? (
                   <div>
                       <p><strong>Blood Group:</strong> {medicalData.bloodGroup || "Not Available"}</p>
                       <p><strong>Allergies:</strong> {medicalData.allergies || "None"}</p>
                       <p><strong>Medications:</strong> {Array.isArray(medicalData.medications) ? medicalData.medications.join(", ") : "No medications listed"}</p>
                   </div>
                ) : <p>No medical data available.</p>}
            </div>

            {/* Appointments */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Appointments</h3>
                <ul>
                    {appointments.length ? appointments.map(appt => (
                        <li key={appt._id} className="border-b py-2">
                            {appt.doctorName} - {new Date(appt.date).toLocaleDateString()}
                        </li>
                    )) : <p>No upcoming appointments.</p>}
                </ul>
            </div>
        </div>
    );
};

export default PatientDashboard;
