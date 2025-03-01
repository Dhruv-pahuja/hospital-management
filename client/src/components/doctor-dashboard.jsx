/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogoutBtn";

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [queue, setQueue] = useState([]);
    const [publicAppointments, setPublicAppointments] = useState([]); // New state

    useEffect(() => {
        // Fetch treated patients
        axios.get("/api/doctor/treated-patients")
            .then(response => setPatients(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching treated patients:", error));

        // Fetch upcoming OPD appointments
        axios.get("/api/doctor/upcoming-appointments")
            .then(response => setAppointments(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching appointments:", error));

        // Fetch initial OPD queue (no authentication required)
        axios.get("http://localhost:4000/api/opdQueue")
            .then(response => setQueue(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching OPD queue:", error));

        // Fetch all public appointments (NEW FEATURE)
        axios.get("http://localhost:4000/api/publicAppointments/all")
            .then(response => setPublicAppointments(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Error fetching public appointments:", error));

        // WebSocket connection for live OPD queue updates
        const ws = new WebSocket("ws://localhost:4000");

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === "queue") {
                setQueue(data.queue);
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
            {/* Logout Button - Positioned at top right */}
            <div className="absolute top-4 right-4">
                <LogoutButton />
            </div>

            <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Treated Patients
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Treated Patients</h3>
                    <ul>
                        {patients.length ? patients.map(patient => (
                            <li key={patient.id} className="border-b py-2">{patient.name}</li>
                        )) : <p>No treated patients found.</p>}
                    </ul>
                </div>

                {/* Upcoming OPD Appointments */}
                {/* <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Upcoming OPD Appointments</h3>
                    <ul>
                        {appointments.length ? appointments.map(appt => (
                            <li key={appt.id} className="border-b py-2">
                                {appt.patientName} - {new Date(appt.date).toLocaleDateString()}
                            </li>
                        )) : <p>No upcoming appointments.</p>}
                    </ul>
                </div> */}

                {/* OPD Queue System 
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Live OPD Queue</h3>
                    <ul>
                        {queue.length > 0 ? queue.map((user, index) => (
                            <li key={user.id} className="border-b py-2">
                                {index + 1}. {user.name}
                            </li>
                        )) : <p>No patients in queue.</p>}
                    </ul>
                </div> */}

                {/* Public Appointments */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow col-span-3">
                    <h3 className="text-xl font-semibold mb-2">Public Appointment Bookings</h3>
                    <table className="w-full border-collapse border border-gray-500">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border border-gray-500 px-4 py-2">Patient Name</th>
                                <th className="border border-gray-500 px-4 py-2">Contact</th>
                                <th className="border border-gray-500 px-4 py-2">Doctor</th>
                                <th className="border border-gray-500 px-4 py-2">Department</th>
                                <th className="border border-gray-500 px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publicAppointments.length > 0 ? (
                                publicAppointments.map(appt => (
                                    <tr key={appt._id} className="border border-gray-500">
                                        <td className="border border-gray-500 px-4 py-2">{appt.patientName}</td>
                                        <td className="border border-gray-500 px-4 py-2">{appt.contactNumber}</td>
                                        <td className="border border-gray-500 px-4 py-2">{appt.doctorId}</td>
                                        <td className="border border-gray-500 px-4 py-2">{appt.department}</td>
                                        <td className="border border-gray-500 px-4 py-2">{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-2">No public appointments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default DoctorDashboard;
