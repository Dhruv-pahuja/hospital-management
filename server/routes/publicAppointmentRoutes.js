const express = require("express");
const { bookAppointment, getAvailableDoctors,updateAppointmentStatus } = require("../controllers/publicAppointmentController");
const {getAllPublicAppointments }= require("../controllers/getAllPublicAppointments");
const router = express.Router();

router.post("/book", bookAppointment);
router.get("/doctors", getAvailableDoctors);
router.get("/all",getAllPublicAppointments)
router.put("/update-status/:id", updateAppointmentStatus);

module.exports = router;
