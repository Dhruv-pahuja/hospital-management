const Bed = require('../models/Bed');

exports.addBed = async (req, res) => {
    const { bedNumber } = req.body;
    const bed = new Bed({ bedNumber });
    await bed.save();
    res.status(201).json({ message: 'Bed added successfully', bed });
};

exports.getBeds = async (req, res) => {
    const beds = await Bed.find();
    res.json(beds);
};