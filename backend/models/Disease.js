// models/diseaseModel.js
const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    disease: { type: String, required: true },
    Allopathic: [String],
    Ayurvedic: [String],
  },
  { timestamps: true }
);

const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;
