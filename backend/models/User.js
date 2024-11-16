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

// Pre-save hook to set the default image based on accountType
userSchema.pre("save", function (next) {
  if (!this.image) {
    switch (this.accountType) {
      case "Doctor":
        this.image = "https://img.freepik.com/premium-vector/doctor-profile-with-medical-service-icon_617655-48.jpg";
        break;
      case "Admin":
        this.image = "https://www.shutterstock.com/image-vector/user-icon-vector-260nw-429103831.jpg";
        break;
      case "Patient":
      default:
        this.image = "https://cdn-icons-png.flaticon.com/512/4228/4228704.png";
        break;
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
