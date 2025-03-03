const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");
const { getMedicalData, getAppointments } = require("../controllers/patientController");
const Patient = require("../models/Patient");
const router = express.Router();

// Get medical data for logged-in patient
router.get("/medical-data", getMedicalData);

// Get appointments for logged-in patient
router.get("/appointments", getAppointments);

// Get all patients
router.get("/all", async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients" });
    }
});

// 🔹 Delete a patient by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndDelete(id);

        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting patient" });
    }
});

module.exports = router;
