const PublicAppointment = require("../models/PublicAppointment");

const getAllPublicAppointments = async (req, res) => {
    try {
        const appointments = await PublicAppointment.find({});
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching public appointments:", error);
        res.status(500).json({ error: "Failed to fetch appointments." });
    }
};

module.exports = { getAllPublicAppointments };
