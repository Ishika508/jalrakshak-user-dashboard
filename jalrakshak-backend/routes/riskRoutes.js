const express = require("express");
const router = express.Router();

const { getRiskAnalysis } = require("../controllers/riskController");

router.get("/", getRiskAnalysis);

module.exports = router;