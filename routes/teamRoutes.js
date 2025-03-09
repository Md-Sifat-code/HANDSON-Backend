const express = require("express");
const Team = require("../models/Team");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Team
router.post("/", authMiddleware, async (req, res) => {
  const team = new Team({ name: req.body.name, members: [req.user.id] });
  await team.save();
  res.json({ message: "Team created" });
});

// Join Team
router.post("/:id/join", authMiddleware, async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).json({ error: "Team not found" });

  team.members.push(req.user.id);
  await team.save();
  res.json({ message: "Joined team successfully" });
});

module.exports = router;
