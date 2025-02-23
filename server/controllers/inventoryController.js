const Inventory = require('../models/Inventory');

exports.addItem = async (req, res) => {
    const { itemName, quantity } = req.body;
    const item = new Inventory({ itemName, quantity });
    await item.save();
    res.status(201).json({ message: 'Item added to inventory', item });
};

exports.getItems = async (req, res) => {
    const items = await Inventory.find();
    res.json(items);
};