const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: false,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: false,
  },
  consultantFee: {
    type: Number,
    required: true,
  },
  approvalStatus: {
    type: Boolean,
    default: false, // Indicates if the doctor is approved by an admin
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: Number,
    required: true, // Experience in years
  },
  images: {
    type: Array,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
