const Sensor = require("../models/Sensor");

exports.getInsights = async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ createdAt: -1 });

    if (!latest) {
      return res.json({ insights: [] });
    }

    const insights = [];

    /* ===== 1. pH contamination ===== */
    if (latest.ph < 6.5 || latest.ph > 8.5) {
      insights.push({
        type: "Chemical Imbalance",
        message: "Abnormal pH detected — possible contamination."
      });
    }

    /* ===== 2. TDS high ===== */
    if (latest.tds > 500) {
      insights.push({
        type: "Storage Contamination",
        message: "High TDS indicates tank impurity or sediment buildup."
      });
    }

    /* ===== 3. Stagnation risk ===== */
    if (latest.tds > 300 && latest.ph > 7.8) {
      insights.push({
        type: "Water Stagnation",
        message: "Water may be stored too long in overhead tank."
      });
    }

    /* ===== 4. Sudden supply issue */
    if (latest.tds > 450) {
      insights.push({
        type: "Pipeline Disturbance",
        message: "Possible contamination after supply restoration."
      });
    }

    /* ===== 5. Cleaning recommendation */
    if (latest.tds > 250) {
      insights.push({
        type: "Maintenance Required",
        message: "Tank cleaning recommended within 7 days."
      });
    }

    /* ===== 6. Safe state */
    if (insights.length === 0) {
      insights.push({
        type: "Water Safe",
        message: "All parameters within healthy range."
      });
    }

    res.json({ insights });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insight engine failed" });
  }
};