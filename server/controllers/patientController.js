const Patient = require("../models/Patient");

// Fetch medical data for the logged-in patient
const getMedicalData = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user.id);
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        res.json({
            bloodGroup: patient.bloodGroup,
            allergies: patient.allergies,
            medications: patient.medications,
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Fetch appointments for the logged-in patient
const getAppointments = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user.id);
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        res.json(patient.appointments);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getMedicalData, getAppointments };
