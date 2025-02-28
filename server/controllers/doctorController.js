const Doctor = require("../models/Doctor");

 const getTreatedPatients = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id); 
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.json(doctor.treatedPatients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching treated patients" });
    }
};

 const getUpcomingAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.json(doctor.appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};


module.exports = { getTreatedPatients, getUpcomingAppointments };