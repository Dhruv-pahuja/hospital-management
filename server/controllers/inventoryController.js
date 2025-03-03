const Inventory = require("../models/Inventory");

// Get all inventory items
exports.getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new item
exports.addItem = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;
    const newItem = new Inventory({ itemName, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Error adding item" });
  }
};

// Update stock quantity
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Error updating stock" });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting item" });
  }
};
