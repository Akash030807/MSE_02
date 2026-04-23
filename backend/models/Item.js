const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  itemName: String,
  description: String,
  type: { type: String, enum: ["Lost", "Found"] },
  location: String,
  date: Date,
  contactInfo: String
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);