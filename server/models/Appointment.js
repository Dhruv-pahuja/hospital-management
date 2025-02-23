const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'canceled'] },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);