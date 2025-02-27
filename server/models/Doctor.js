const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    treatedPatients: [{ 
        name: String,
        treatmentDate: Date
    }],
    appointments: [{
        patientName: String,
        date: Date
    }]
});

module.exports = mongoose.model("Doctor", doctorSchema);

