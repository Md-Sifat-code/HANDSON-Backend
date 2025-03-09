const express = require("express");
const HelpRequest = require("../models/HelpRequest");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Help Request
router.post("/", authMiddleware, async (req, res) => {
  const helpRequest = new HelpRequest(req.body);
  await helpRequest.save();
  res.json({ message: "Help request created" });
});

// Get All Help Requests
router.get("/", async (req, res) => {
  const requests = await HelpRequest.find();
  res.json(requests);
});

module.exports = router;
