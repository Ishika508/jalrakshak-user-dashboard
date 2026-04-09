require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const insightRoutes = require("./routes/insightRoutes");
const app = express();
const riskRoutes = require("./routes/riskRoutes");
// middleware
app.use(cors());
app.use(express.json());


// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// routes
const userRoutes = require("./routes/userRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
app.use("/api/insights", insightRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/risk", riskRoutes);
// test route
app.get("/", (req, res) => {
  res.send("✅ JalRakshak Backend Running");
});

// start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});