const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,  // expires in 5 minutes (300 seconds)
  },
}, { timestamps: true });

module.exports = mongoose.model("OTP", otpSchema);
