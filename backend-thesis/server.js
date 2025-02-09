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

// WebSocket Logic
let experienceUsers = {}; // Stores people count per experience

io.on("connection", (socket) => {
  console.log("🔗 New WebSocket Connection:", socket.id);

  // Send initial people count
  socket.emit("updatePeopleCount", experienceUsers);

  socket.on("joinExperience", (experienceId) => {
    if (!experienceUsers[experienceId]) {
      experienceUsers[experienceId] = 0;
    }
    experienceUsers[experienceId] += 1;
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
