const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    const { patientId, doctorId, appointmentDate } = req.body;
    const appointment = new Appointment({ patientId, doctorId, appointmentDate });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
};

exports.getAppointments = async (req, res) => {
    const appointments = await Appointment.find().populate('patientId doctorId');
    res.json(appointments);
};