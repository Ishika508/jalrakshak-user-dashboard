const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    deviceId: String,
    ph: Number,
    tds: Number,
    temperature: Number,
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensor", sensorSchema);