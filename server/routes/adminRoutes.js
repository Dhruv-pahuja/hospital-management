const express = require("express");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const router = express.Router();

// Get all doctors
router.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors" });
    }
});

// Get all patients
router.get("/patients", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients" });
    }
});

// Add a new doctor
router.post("/doctors", async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: "Error adding doctor" });
    }
});

// Add a new patient
router.post("/patients", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ message: "Error adding patient" });
    }
});

// Update a doctor
router.put("/doctors/:id", async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: "Error updating doctor" });
    }
});

// Update a patient
router.put("/patients/:id", async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: "Error updating patient" });
    }
});

// Delete a doctor
router.delete("/doctors/:id", async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting doctor" });
    }
});

// Delete a patient
router.delete("/patients/:id", async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting patient" });
    }
});

module.exports = router;
