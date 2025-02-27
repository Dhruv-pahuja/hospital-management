const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor"); // Ensure this path is correct

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Sample doctors data
const doctors = [
    { name: "Dr. John Doe", department: "Cardiology", experience: 10 },
    { name: "Dr. Jane Smith", department: "Neurology", experience: 8 },
];

// Seed doctors into the database
const seedDoctors = async () => {
    try {
        await Doctor.deleteMany(); // Clear existing records
        await Doctor.insertMany(doctors);
        console.log("Doctors seeded successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding doctors:", error);
    }
};

// Run the function
seedDoctors();
