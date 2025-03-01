const mongoose = require("mongoose");

const publicAppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    department: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PublicAppointment", publicAppointmentSchema);
