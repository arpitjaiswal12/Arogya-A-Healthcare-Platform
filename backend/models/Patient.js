const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicalHistory: {
    type: [
      {
        condition: { type: String, required: true },
        diagnosisDate: { type: Date },
        treatment: { type: String },
      },
    ],
    default: [],
  },
  medications: {
    type: [
      {
        name: { type: String, required: true },
        dosage: { type: String },
        frequency: { type: String },
      },
    ],
    default: [],
  },
  allergies: {
    type: [String],
    default: [],
  },
  emergencyContact: {
    name: { type: String },
    relation: { type: String },
    contactNumber: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
