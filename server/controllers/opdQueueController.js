const Appointment = require("../models/Appointment");

const joinQueue = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const patientId = req.user.id;

        const newAppointment = new Appointment({ patientId, doctorId });
        await newAppointment.save();

        res.json({ message: "Added to OPD queue", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: "Error joining queue" });
    }
};

const getQueue = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const queue = await Appointment.find({ doctorId, status: "waiting" }).sort("createdAt");

        res.json(queue);
    } catch (error) {
        res.status(500).json({ error: "Error fetching queue" });
    }
};

const startAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await Appointment.findByIdAndUpdate(appointmentId, { status: "in-progress" });

        res.json({ message: "Appointment started" });
    } catch (error) {
        res.status(500).json({ error: "Error updating appointment status" });
    }
};

const completeAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await Appointment.findByIdAndUpdate(appointmentId, { status: "completed" });

        res.json({ message: "Appointment completed" });
    } catch (error) {
        res.status(500).json({ error: "Error completing appointment" });
    }
};

module.exports = { joinQueue, getQueue, startAppointment, completeAppointment };
