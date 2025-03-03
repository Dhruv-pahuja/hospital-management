const Queue = require("../models/Queue");

let io;

const setSocket = (socketInstance) => {
  io = socketInstance;
};

const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ status: "waiting" });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToQueue = async (req, res) => {
  try {
    const { department, patientName } = req.body;
    if (!department || !patientName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEntry = new Queue({ department, patientName });
    await newEntry.save();

    const updatedQueues = await Queue.find({ status: "waiting" });

    io.emit("queueUpdated", updatedQueues);

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeQueue = async (req, res) => {
  try {
    const { id } = req.params;
    await Queue.findByIdAndUpdate(id, { status: "completed" });

    const updatedQueues = await Queue.find({ status: "waiting" });

    io.emit("queueUpdated", updatedQueues);

    res.json({ message: "Queue entry marked as completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { setSocket, getQueues, addToQueue, completeQueue };
