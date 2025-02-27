const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bloodGroup: { type: String },
    allergies: { type: String },
    medications: [{ type: String }],
    appointments: [{
        doctorName: String,
        date: Date
    }]
});

// Fix the OverwriteModelError
module.exports = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
