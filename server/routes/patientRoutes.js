const express = require("express");
const authMiddleware = require("../middelwares/authMiddelware");
const { getMedicalData, getAppointments } = require("../controllers/patientController");

const router = express.Router();

// Get medical data for logged-in patient
router.get("/medical-data", authMiddleware, getMedicalData);

// Get appointments for logged-in patient
router.get("/appointments", authMiddleware, getAppointments);

module.exports = router;
