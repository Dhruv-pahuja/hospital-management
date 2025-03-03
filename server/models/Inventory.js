const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Inventory", inventorySchema);
