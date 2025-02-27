const express = require("express");
const { getDoctors, getPatients, getInventory } = require("../controllers/adminController");
const authMiddleware = require("../middelwares/authMiddelware");

const router = express.Router();

router.get("/doctors", authMiddleware, getDoctors);
router.get("/patients", authMiddleware, getPatients);
router.get("/inventory", authMiddleware, getInventory);

module.exports = router;
