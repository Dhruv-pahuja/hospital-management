const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
    department: { type: String, required: true },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "PublicAppointment" }]
});

const Queue = mongoose.models.Queue || mongoose.model("Queue", queueSchema);

module.exports = Queue;
