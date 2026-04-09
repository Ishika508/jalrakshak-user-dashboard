const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  village: String,

  symptoms: [String],     // fever, diarrhea etc
  waterIssue: String,     // bad smell, color etc

  status: {
    type: String,
    default: "Pending"    // Gov can update later
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);