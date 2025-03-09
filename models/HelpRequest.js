const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema({
  description: String,
  urgency: String,
  responses: [{ user: mongoose.Schema.Types.ObjectId, message: String }],
});

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);
