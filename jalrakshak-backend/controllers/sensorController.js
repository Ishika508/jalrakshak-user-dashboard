const Sensor = require("../models/Sensor");

// RECEIVE SENSOR DATA FROM ESP32
exports.addSensorData = async (req, res) => {
  try {
    const sensorData = new Sensor(req.body);
    await sensorData.save();

    res.status(200).json({
      message: "Sensor data received",
      data: sensorData
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET LATEST SENSOR DATA (Gov Dashboard)
exports.getLatestData = async (req, res) => {
  try {
    const data = await Sensor.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};