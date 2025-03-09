const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Event
router.post("/", authMiddleware, async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json({ message: "Event created successfully" });
});

// Get All Events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Join Event
router.post("/:id/join", authMiddleware, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });

  event.attendees.push(req.user.id);
  await event.save();
  res.json({ message: "Joined event successfully" });
});

module.exports = router;
