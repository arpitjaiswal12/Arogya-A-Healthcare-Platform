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
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    default: "Student",
  },
  approved: {
    type: Boolean,
    default: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  image: {
    type: String,
    default: "",
  },
  token: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
