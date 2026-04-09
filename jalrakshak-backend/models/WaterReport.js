const mongoose = require("mongoose");

const waterReportSchema = new mongoose.Schema({
  userName: String,
  village: String,

  imageUrl: String,
  description: String,

  cleanerRequested: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("WaterReport", waterReportSchema);