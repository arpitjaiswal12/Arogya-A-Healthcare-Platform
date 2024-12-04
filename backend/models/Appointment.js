const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      start: {
        type: String,
        required: true, // Format: 'HH:MM'
      },
      end: {
        type: String,
        required: true, // Format: 'HH:MM'
      },
    },
    description: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Middleware to set the `day` field based on the `date`
appointmentSchema.pre("save", function (next) {
  if (this.date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = this.date.getUTCDay(); // Get day of week as a number (0 - Sunday, 6 - Saturday)
    this.day = daysOfWeek[dayIndex];
  }
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
