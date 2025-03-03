const mongoose = require("mongoose");
const Patient = require("./models/Patients"); // Adjust the path if needed
require("dotenv").config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const patients = [
  {
    name: "John Doe",
    bloodGroup: "O+",
    allergies: "Peanuts",
    medications: ["Aspirin", "Ibuprofen"],
    appointments: [
      { doctorName: "Dr. Smith", date: new Date("2024-03-05") },
    ],
  },
  {
    name: "Jane Smith",
    bloodGroup: "A+",
    allergies: "None",
    medications: ["Metformin"],
    appointments: [
      { doctorName: "Dr. Brown", date: new Date("2024-03-10") },
    ],
  },
  {
    name: "Alice Johnson",
    bloodGroup: "B+",
    allergies: "Dust",
    medications: ["Loratadine"],
    appointments: [
      { doctorName: "Dr. Green", date: new Date("2024-03-12") },
    ],
  },
  {
    name: "Bob Williams",
    bloodGroup: "AB-",
    allergies: "Shellfish",
    medications: ["Epinephrine"],
    appointments: [
      { doctorName: "Dr. Adams", date: new Date("2024-03-14") },
    ],
  },
  {
    name: "Charlie Brown",
    bloodGroup: "O-",
    allergies: "Pollen",
    medications: ["Cetirizine"],
    appointments: [
      { doctorName: "Dr. Miller", date: new Date("2024-03-20") },
    ],
  },
  {
    name: "David Lee",
    bloodGroup: "B-",
    allergies: "Latex",
    medications: ["Prednisone"],
    appointments: [
      { doctorName: "Dr. Wilson", date: new Date("2024-03-25") },
    ],
  },
];

// Function to seed the database
const seedPatients = async () => {
  try {
    await Patient.deleteMany(); // Clear existing data
    await Patient.insertMany(patients);
    console.log("✅ Patient data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding patients:", error);
    mongoose.connection.close();
  }
};

seedPatients();
