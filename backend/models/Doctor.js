const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    consultantFee: {
      type: Number,
    },
    approvalStatus: {
      type: Boolean,
      default: false, // Indicates if the doctor is approved by an admin
    },
    specialization: {
      type: String,
      trim: true,
    },
    availableTimeSlot: {
      type: String,
      trim: true,
    },

    certification: {
      type: String,
      trim: true,
    },

    degrees: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number,
     // Experience in years
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
