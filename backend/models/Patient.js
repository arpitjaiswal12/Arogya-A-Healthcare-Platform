const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicalHistory: {
    type:String,
  },
  medications: {
    type:String,
  },
  allergies: {
    type: String,
  },
  emergencyContact: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
