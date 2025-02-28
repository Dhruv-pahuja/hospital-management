const express = require("express");
const authMiddleware = require("../middelwares/authMiddelware");
const { joinQueue, getQueue, startAppointment, completeAppointment } = require("../controllers/opdQueueController");

const router = express.Router();

router.post("/join", authMiddleware, joinQueue);
router.get("/queue/:doctorId", authMiddleware, getQueue);
router.post("/start", authMiddleware, startAppointment);
router.post("/complete", authMiddleware, completeAppointment);

module.exports = router;
