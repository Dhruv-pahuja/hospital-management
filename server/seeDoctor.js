const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor"); 

dotenv.config(); 


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Sample doctors data
const doctors = [
    { 
        name: "Dr. John Doe", 
        department: "Cardiology", 
        description: "Expert in heart diseases and cardiac surgery.", 
        treatedPatients: [], 
        appointments: [] 
    },
    { 
        name: "Dr. Jane Smith", 
        department: "Orthopedics", 
        description: "Specialist in bone fractures and joint replacements.", 
        treatedPatients: [], 
        appointments: [] 
    },
    { 
        name: "Dr. Amit", 
        department: "General Medicine", 
        description: "Experienced in diagnosing common illnesses.", 
        treatedPatients: [], 
        appointments: [] 
    },
    { 
        name: "Dr. Sushant", 
        department: "Neurology", 
        description: "Specialist in brain and nervous system disorders.", 
        treatedPatients: [], 
        appointments: [] 
    }
];


const seedDoctors = async () => {
    try {
        await Doctor.deleteMany(); 
        await Doctor.insertMany(doctors);
        console.log("Doctors seeded successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding doctors:", error);
    }
};


seedDoctors();
