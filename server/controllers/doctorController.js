import Doctor from "../models/Doctor.js";

// Fetch treated patients
export const getTreatedPatients = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id); // Assuming `req.user.id` contains the logged-in doctor's ID
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.json(doctor.treatedPatients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching treated patients" });
    }
};

// Fetch upcoming appointments
export const getUpcomingAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.json(doctor.appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};
