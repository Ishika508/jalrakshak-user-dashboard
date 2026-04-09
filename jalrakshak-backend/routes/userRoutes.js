const express = require("express");
const router = express.Router();

const {
  createReport,
  getReports
} = require("../controllers/userController");

// Citizen submits report
router.post("/report", createReport);

// Government fetches all reports
router.get("/all", getReports);

module.exports = router;