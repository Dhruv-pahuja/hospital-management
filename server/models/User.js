const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor", "admin"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
