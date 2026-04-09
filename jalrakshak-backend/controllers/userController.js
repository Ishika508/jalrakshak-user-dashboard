const User = require("../models/User");

// CREATE REPORT
exports.createReport = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "Report submitted successfully",
      data: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL REPORTS (Gov dashboard)
exports.getReports = async (req, res) => {
  try {
    const reports = await User.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};