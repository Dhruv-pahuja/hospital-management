const express = require("express");
const Doctor = require("../models/Doctor");
const { getTreatedPatients, getUpcomingAppointments } = require("../controllers/doctorController");
const authMiddleware = require("../middelwares/authMiddelware");
const router = express.Router();

router.get("/treated-patients", authMiddleware, getTreatedPatients);
router.get("/upcoming-appointments", authMiddleware, getUpcomingAppointments);

router.get("/all", async (req, res) => {
    try {
        const doctors = await Doctor.find({}); 
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors" });
    }
});

router.post("/", async (req, res) => {
    try {
      const { name, department, description } = req.body;
      if (!name || !department || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newDoctor = new Doctor({ name, department, description });
      await newDoctor.save();
      res.status(201).json(newDoctor);
    } catch (error) {
      res.status(500).json({ message: "Error adding doctor" });
    }
  });
  
  // Delete a doctor
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Doctor.findByIdAndDelete(id);
      res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting doctor" });
    }
  });
  
  module.exports = router;

