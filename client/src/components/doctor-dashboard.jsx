import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogoutBtn";

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [queue, setQueue] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("/api/doctor/treated-patients", { withCredentials: true })
            .then(response => setPatients(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching treated patients:", error));

        axios.get("/api/doctor/upcoming-appointments", { withCredentials: true })
            .then(response => setAppointments(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching appointments:", error));

        // WebSocket connection for OPD queue updates
        if (!token) return;
        const ws = new WebSocket("ws://localhost:4000", token);

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === "queue") {
                setQueue(data.queue);
            }
        };

        return () => ws.close();
    }, [token]);

    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
            {/* Logout Button - Positioned at top right */}
            <div className="absolute top-4 right-4">
                <LogoutButton />
            </div>

            <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Treated Patients */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Treated Patients</h3>
                    <ul>
                        {patients.length ? patients.map(patient => (
                            <li key={patient.id} className="border-b py-2">{patient.name}</li>
                        )) : <p>No treated patients found.</p>}
                    </ul>
                </div>

                {/* Upcoming OPD Appointments */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Upcoming OPD Appointments</h3>
                    <ul>
                        {appointments.length ? appointments.map(appt => (
                            <li key={appt.id} className="border-b py-2">
                                {appt.patientName} - {new Date(appt.date).toLocaleDateString()}
                            </li>
                        )) : <p>No upcoming appointments.</p>}
                    </ul>
                </div>

                {/* OPD Queue System */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Live OPD Queue</h3>
                    <ul>
                        {queue.length > 0 ? queue.map((user, index) => (
                            <li key={user.id} className="border-b py-2">
                                {index + 1}. {user.name}
                            </li>
                        )) : <p>No patients in queue.</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
