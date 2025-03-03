const PublicAppointment = require("../models/PublicAppointment");
const Doctor = require("../models/Doctor");

const bookAppointment = async (req, res) => {
    try {
        const { patientName, contactNumber, doctorId, department, appointmentDate, appointmentTime } = req.body;

        if (!patientName || !contactNumber || !doctorId || !department || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newAppointment = new PublicAppointment({
            patientName,
            contactNumber,
            doctorId,
            department,
            appointmentDate,
            appointmentTime  // <-- Save appointment time
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

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "completed", "cancelled"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const appointment = await PublicAppointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ message: "Appointment status updated", appointment });
    } catch (error) {
        res.status(500).json({ error: "Error updating appointment status" });
    }
};

module.exports = { bookAppointment, getAvailableDoctors, updateAppointmentStatus };
