const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");

/* ================= POST SENSOR DATA (ESP sends here) ================= */
router.post("/", async (req, res) => {
  try {
    const sensor = new Sensor(req.body);
    await sensor.save();

    res.json({
      success: true,
      message: "Sensor data stored",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save sensor data" });
  }
});

/* ================= GET LATEST SENSOR DATA ================= */
router.get("/", async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;