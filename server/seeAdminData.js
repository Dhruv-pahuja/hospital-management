const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Doctor = require("./models/Doctor");
const Patient = require("./models/Patient");
const Inventory = require("./models/Inventory");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("MongoDB Connected. Seeding Data...");

    await Doctor.insertMany([
        { name: "Dr. Smith", department: "Cardiology" },
        { name: "Dr. Johnson", department: "Neurology" }
    ]);

    await Patient.insertMany([
        { name: "John Doe", status: "Admitted" },
        { name: "Jane Doe", status: "Discharged" }
    ]);

    await Inventory.insertMany([
        { name: "Syringes", quantity: 100 },
        { name: "Gloves", quantity: 50 }
    ]);

    console.log("Data Inserted Successfully");
    mongoose.connection.close();
}).catch(err => console.error(err));
