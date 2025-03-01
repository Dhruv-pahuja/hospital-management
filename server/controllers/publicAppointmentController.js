const PublicAppointment = require("../models/PublicAppointment");
const Doctor = require("../models/Doctor");

const bookAppointment = async (req, res) => {
    try {
        const { patientName, contactNumber, doctorId, department, appointmentDate } = req.body;

        if (!patientName || !contactNumber || !doctorId || !department || !appointmentDate) {
            return res.status(400).json({ error: "All fields are required." });  // This causes 400 error
        }

        const newAppointment = new PublicAppointment({
            patientName,
            contactNumber,
            doctorId,
            department,
            appointmentDate
        });

        await newAppointment.save();
        res.json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: "Error booking appointment" });
    }
};


const getAvailableDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}, "name department");
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: "Error fetching doctors" });
    }
};

module.exports = { bookAppointment, getAvailableDoctors };
