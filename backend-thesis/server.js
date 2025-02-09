require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // Allow frontend requests
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json()); // Allow JSON payloads

let experienceData = {};

const experiences = [
  { id: "experience1", title: "Bertrand", location: "Bertrand", coordinates: [38.710712892523695, -9.14116628132217] },
  { id: "experience2", title: "Modelo", location: "Modelo", coordinates: [38.709899442837504, -9.141786418367884] },
  { id: "experience3", title: "Estatua", location: "Estatua", coordinates: [38.71051049617013, -9.142228602930569] },
  { id: "experience4", title: "MUP", location: "MUP", coordinates: [38.709363862713104, -9.141031676168348] },
];

// API Route: Get experience data
app.get("/experiences", (req, res) => {
  res.json(experiences);
});

// WebSocket Logic
let experienceUsers = {}; // Stores people count per experience

io.on("connection", (socket) => {
  console.log("🔗 New WebSocket Connection:", socket.id);

  // Send initial people count
  socket.emit("updatePeopleCount", experienceUsers);

  socket.on("joinExperience", (experienceId) => {
    experienceUsers[experienceId] = (experienceUsers[experienceId] || 0) + 1;
    io.emit("updatePeopleCount", experienceUsers);
  });

  socket.on("leaveExperience", (experienceId) => {
    if (experienceUsers[experienceId] > 0) {
      experienceUsers[experienceId] -= 1;
      io.emit("updatePeopleCount", experienceUsers);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
