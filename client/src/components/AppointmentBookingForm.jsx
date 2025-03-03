/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaCalendarAlt, FaClock, FaHospital } from "react-icons/fa";

const AppointmentBookingForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        patientName: "",
        contactNumber: "",
        doctorId: "",
        department: "",
        appointmentDate: "",
        appointmentTime: ""  // ✅ Added appointment time field
    });

    useEffect(() => {
        axios.get("http://localhost:4000/api/publicAppointments/doctors")
            .then(response => {
                console.log("Doctors API Response:", response.data);
                if (Array.isArray(response.data)) {
                    setDoctors(response.data);
                } else {
                    setDoctors([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching doctors:", error);
                setError("Failed to load doctors.");
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "doctorId") {
            const selectedDoctor = doctors.find(doc => doc._id === value);
            setFormData({
                ...formData,
                doctorId: value,
                department: selectedDoctor ? selectedDoctor.department : "" // Auto-update department
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/publicAppointments/book", formData);
            alert(response.data.message);
            setFormData({
                patientName: "",
                contactNumber: "",
                doctorId: "",
                department: "",
                appointmentDate: "",
                appointmentTime: ""  // ✅ Reset appointment time
            });
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
                    Book an Appointment
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Appointment Booking Form */}
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                            Fill Your Details
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center border border-gray-300 p-3 rounded-md">
                                <FaUser className="text-gray-500 mr-3" />
                                <input
                                    type="text"
                                    name="patientName"
                                    placeholder="Full Name"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center border border-gray-300 p-3 rounded-md">
                                <FaPhone className="text-gray-500 mr-3" />
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Doctor Dropdown */}
                            <div className="flex items-center border border-gray-300 p-3 rounded-md">
                                <FaHospital className="text-gray-500 mr-3" />
                                <select
                                    name="doctorId"
                                    value={formData.doctorId}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none bg-white"
                                    required
                                >
                                    <option value="">Select Doctor</option>
                                    {loading ? (
                                        <option disabled>Loading...</option>
                                    ) : doctors.length > 0 ? (
                                        doctors.map(doctor => (
                                            <option key={doctor._id} value={doctor._id}>
                                                {doctor.name} - {doctor.department}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No doctors available</option>
                                    )}
                                </select>
                            </div>

                            {/* Read-Only Department Field */}
                            <div className="flex items-center border border-gray-300 p-3 rounded-md bg-gray-200">
                                <FaHospital className="text-gray-500 mr-3" />
                                <input
                                    type="text"
                                    name="department"
                                    placeholder="Department"
                                    value={formData.department}
                                    className="w-full focus:outline-none bg-gray-200"
                                    readOnly  // Make it non-editable
                                />
                            </div>

                            {/* Appointment Date */}
                            <div className="flex items-center border border-gray-300 p-3 rounded-md">
                                <FaCalendarAlt className="text-gray-500 mr-3" />
                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Appointment Time */}
                            <div className="flex items-center border border-gray-300 p-3 rounded-md">
                                <FaClock className="text-gray-500 mr-3" />
                                <input
                                    type="time"
                                    name="appointmentTime"
                                    value={formData.appointmentTime}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                Book Appointment
                            </button>
                        </form>
                    </div>

                    {/* Appointment Information */}
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                            Why Book an Appointment?
                        </h2>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li className="mb-2">Quick and easy appointment scheduling.</li>
                            <li className="mb-2">Select from a range of experienced doctors.</li>
                            <li className="mb-2">Choose a department as per your needs.</li>
                            <li className="mb-2">Instant confirmation and hassle-free visits.</li>
                        </ul>
                        <p className="mt-4 text-gray-600">
                            Our dedicated team is here to provide you with the best healthcare services.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBookingForm;
