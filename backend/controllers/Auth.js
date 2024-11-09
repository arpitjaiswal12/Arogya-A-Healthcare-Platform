const User = require("../models/User.js"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");

require("dotenv").config();

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET; // Store in env file

// Signup Controller
exports.signup = async (req, res) => {
  const { firstName, lastName, email, contactNumber, password, accountType } =
    req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      // No need to include dateOfBirth, gender, bloodGroup here
    });

    if (accountType == "Doctor") {
      await newUser.save();
      if (!newUser._id) {
        res.status(500).json({ message: "Server error" });
      }
      const newDoctor = new Doctor({ user: newUser._id });
      await newDoctor.save();
    } else if (accountType == "Patient") {
      await newUser.save();
      if (!newUser._id) {
        res.status(500).json({ message: "Server error" });
      }
      const newPatient = new Patient({ user: newUser._id });
      await newPatient.save();
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials: User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, accountType: user.accountType },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Find the user in the specific collection (Doctor or Patient)
    let findUser = null;
    if (user.accountType === "Doctor") {
      findUser = await Doctor.findOne({ user: user._id });
    } else if (user.accountType === "Patient") {
      findUser = await Patient.findOne({ User: user._id });
    }

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accountType: user.accountType,
          image: user.image,
          contactNumber: user.contactNumber,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          bloodGroup: user.bloodGroup,
        },
        currentType: findUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
