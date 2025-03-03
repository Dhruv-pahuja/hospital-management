import { useEffect, useState } from "react";
import axios from "axios";

const Patients = () => {
    const [patients, setPatients] = useState([]);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetchPatients();
    });

    const fetchPatients = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/patients/all`);
            setPatients(res.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const deletePatient = async (id) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/patients/${id}`);
            fetchPatients();
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Patients List</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Blood Group</th>
                        <th className="border p-2">Allergies</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((pat) => (
                        <tr key={pat._id}>
                            <td className="border p-2">{pat.name}</td>
                            <td className="border p-2">{pat.bloodGroup}</td>
                            <td className="border p-2">{pat.allergies}</td>
                            <td className="border p-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deletePatient(pat._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Patients;
