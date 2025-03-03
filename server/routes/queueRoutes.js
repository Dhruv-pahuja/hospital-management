const express = require("express");
const { getQueues, addToQueue, completeQueue } = require("../controllers/queueController");

const router = express.Router();

router.get("/", getQueues);
router.post("/add", addToQueue);
router.put("/complete/:id", completeQueue);

module.exports = router;
