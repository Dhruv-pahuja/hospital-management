const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const WebSocket = require("ws");
const Queue = require("./models/Queue"); // Import Queue Model
const PublicAppointment = require("./models/PublicAppointment"); // Import Appointment Model

dotenv.config();
const app = express();
connectDB();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/opdQueue", require("./routes/opdQueue"));
app.use("/api/beds", require("./routes/beds"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/patient", require("./routes/patientRoutes"));
app.use("/api/staff", require("./routes/adminRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/publicAppointments", require("./routes/publicAppointmentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Function to fetch and update today's OPD queue
const fetchTodayQueue = async () => {
    const today = new Date().toISOString().split("T")[0];

    // Fetch pending appointments for today
    const appointments = await PublicAppointment.find({
        appointmentDate: { $gte: new Date(today), $lt: new Date(today + "T23:59:59Z") },
        status: "pending",
    });

    let opdQueues = {};

    // Group appointments by department
    for (let appt of appointments) {
        if (!opdQueues[appt.department]) {
            opdQueues[appt.department] = [];
        }
        opdQueues[appt.department].push(appt._id);
    }

    // Update the queue model in the database
    for (let dept in opdQueues) {
        await Queue.findOneAndUpdate(
            { department: dept },
            { department: dept, appointments: opdQueues[dept] },
            { upsert: true }
        );
    }

    // Fetch updated queues with full appointment details
    const updatedQueues = await Queue.find().populate("appointments");
    return updatedQueues;
};

// Broadcast queue data to all connected clients
function broadcastQueue(opdQueues) {
    const queueData = JSON.stringify({ type: "queue", opdQueues });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(queueData);
        }
    });
}

// WebSocket Connection
wss.on("connection", async (ws) => {
    console.log("New WebSocket connection");

    const opdQueues = await fetchTodayQueue();
    ws.send(JSON.stringify({ type: "queue", opdQueues }));

    ws.on("message", async (message) => {
        try {
            const { type, department, appointmentId } = JSON.parse(message);

            if (type === "removePatient") {
                await PublicAppointment.findByIdAndUpdate(appointmentId, { status: "completed" });

                const updatedQueue = await fetchTodayQueue();
                broadcastQueue(updatedQueue);
            }
        } catch (error) {
            console.error("Error processing WebSocket message:", error);
        }
    });

    ws.on("close", () => {
        console.log("WebSocket client disconnected");
    });
});

// Periodically update & broadcast queue every 60 seconds
setInterval(async () => {
    const opdQueues = await fetchTodayQueue();
    broadcastQueue(opdQueues);
}, 60000);

// REST API to fetch queue (fallback for WebSockets)
app.get("/api/opdQueue", async (req, res) => {
    const opdQueues = await fetchTodayQueue();
    res.json(opdQueues);
});

app.get("/", (req, res) => {
    res.send("Hospital Management System API Running!");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
