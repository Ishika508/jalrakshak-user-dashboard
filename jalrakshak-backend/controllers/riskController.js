const Sensor = require("../models/Sensor");

/*
  SMART WATER RISK ENGINE
*/

exports.getRiskAnalysis = async (req, res) => {
  try {
    // latest sensor reading
    const latest = await Sensor.findOne().sort({ createdAt: -1 });

    if (!latest)
      return res.status(404).json({ message: "No sensor data" });

    let riskScore = 0;
    let factors = [];

    /* ========= RULE ENGINE ========= */

    // 1️⃣ TDS abnormal
    if (latest.tds > 500) {
      riskScore += 40;
      factors.push("High TDS detected");
    }

    // 2️⃣ pH abnormal
    if (latest.ph < 6.5 || latest.ph > 8.5) {
      riskScore += 30;
      factors.push("Unsafe pH level");
    }

    // 3️⃣ Stagnation detection
    const minutesSinceUpdate =
      (Date.now() - new Date(latest.createdAt)) / 60000;

    if (minutesSinceUpdate > 30) {
      riskScore += 20;
      factors.push("Possible water stagnation");
    }

    // 4️⃣ Safe normalization
    if (riskScore > 100) riskScore = 100;

    /* ========= RISK LABEL ========= */

    let level = "LOW";

    if (riskScore >= 70) level = "HIGH";
    else if (riskScore >= 40) level = "MEDIUM";

    res.json({
      riskScore,
      level,
      factors,
      sensor: latest,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Risk engine failed" });
  }
};