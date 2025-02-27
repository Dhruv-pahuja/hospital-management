import express from "express";
import { getTreatedPatients, getUpcomingAppointments } from "../controllers/doctorController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Ensure only logged-in doctors access

const router = express.Router();

router.get("/treated-patients", authMiddleware, getTreatedPatients);
router.get("/upcoming-appointments", authMiddleware, getUpcomingAppointments);

export default router;
