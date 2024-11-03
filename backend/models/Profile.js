// models/Profile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: { type: String, default: null },
  dateOfBirth: { type: Date, default: null },
  about: { type: String, default: null },
  contactNumber: { type: String, default: null },
  // Add any other fields as required
});

module.exports = mongoose.model("Profile", profileSchema);
