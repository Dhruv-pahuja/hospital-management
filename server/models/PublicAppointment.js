const mongoose = require("mongoose");

const publicAppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    department: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },  
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

const PublicAppointment = mongoose.models.PublicAppointment || mongoose.model("PublicAppointment", publicAppointmentSchema);

module.exports = PublicAppointment;
