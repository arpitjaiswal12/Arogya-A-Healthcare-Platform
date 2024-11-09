const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Patient", "Doctor", "Admin"],
    default: "Patient",
  },
  image: {
    type: String,
    default: "",
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
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
