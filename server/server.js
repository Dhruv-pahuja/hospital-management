const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const WebSocket = require("ws");

dotenv.config();
const app = express();
connectDB();

// Create HTTP server for WebSockets
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Import routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/opdQueue", require("./routes/opdQueue"));
app.use("/api/beds", require("./routes/beds"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/patient", require("./routes/patientRoutes"));
app.use("/api/staff", require("./routes/adminRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/publicAppointments", require("./routes/publicAppointmentRoutes"));

let queue = [];

wss.on("connection", (ws, req) => {
    console.log("New WebSocket connection");

    const token = req.headers["sec-websocket-protocol"];
    if (!token) {
        ws.close();
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        ws.user = user;
    } catch (error) {
        ws.close();
        return;
    }

    ws.send(JSON.stringify({ type: "queue", queue }));

    ws.on("message", (message) => {
        const data = JSON.parse(message);
        
        if (data.type === "joinQueue") {
            queue.push({ id: ws.user.id, name: ws.user.name });
            broadcastQueue();
        } else if (data.type === "leaveQueue") {
            queue = queue.filter(user => user.id !== ws.user.id);
            broadcastQueue();
        }
    });

    ws.on("close", () => {
        queue = queue.filter(user => user.id !== ws.user.id);
        broadcastQueue();
    });
});

function broadcastQueue() {
    const queueData = JSON.stringify({ type: "queue", queue });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(queueData);
        }
    });
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
