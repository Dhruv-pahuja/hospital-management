const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['doctor', 'staff', 'patient','admin'] },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);