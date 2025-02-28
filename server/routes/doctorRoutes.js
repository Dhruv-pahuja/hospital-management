const express = require("express");
const Doctor = require("../models/Doctor");
const { getTreatedPatients, getUpcomingAppointments } = require("../controllers/doctorController");
const authMiddleware = require("../middelwares/authMiddelware");
const router = express.Router();

router.get("/treated-patients", authMiddleware, getTreatedPatients);
router.get("/upcoming-appointments", authMiddleware, getUpcomingAppointments);

router.get("/all", async (req, res) => {
    try {
        const doctors = await Doctor.find({}, "name"); 
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors" });
    }
});
module.exports = router;
