const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    bedNumber: { type: String, required: true, unique: true },
    isOccupied: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Bed', bedSchema);