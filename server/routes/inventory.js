const express = require("express");
const router = express.Router();
const {
  getInventory,
  addItem,
  updateStock,
  deleteItem,
} = require("../controllers/inventoryController");

router.get("/", getInventory);
router.post("/add", addItem);
router.put("/update/:id", updateStock);
router.delete("/delete/:id", deleteItem);

module.exports = router;
