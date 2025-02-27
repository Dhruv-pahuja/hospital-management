const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Inventory = require("../models/Inventory");

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: "Error fetching doctors" });
    }
};

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: "Error fetching patients" });
    }
};

const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find({});
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: "Error fetching inventory" });
    }
};

module.exports = { getDoctors, getPatients, getInventory };
