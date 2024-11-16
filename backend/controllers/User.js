const User = require("../models/User.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");
const Disease = require("../models/Disease.js");

exports.updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the doctorId is passed in the URL
    const { accountType, gender, dateOfBirth, bloodGroup, contactNumber } =
      req.body;

    if (accountType == "Doctor") {
      // Find the existing doctor profile

      const {
        availableTimeSlot,
        consultantFee,
        specialization,
        experience,
        degrees,
        certification,
      } = req.body;

      const doctorProfile = await Doctor.findOne({ user: userId }).populate(
        "user"
      );
      //await Doctor.findById(userId).populate("user");
      if (!doctorProfile) {
        return res.status(404).json({
          success: false,
          message: "Doctor profile not found.",
        });
      }

      console.log("--------> ", doctorProfile);

      // Update the User details (firstName, lastName, email, contactNumber)
      const user = await User.findById(doctorProfile.user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User associated with this doctor profile not found.",
        });
      }

      // Update common user fields
      if (dateOfBirth) user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      if (gender) user.gender = gender || user.gender;
      if (bloodGroup) user.bloodGroup = bloodGroup || user.bloodGroup;
      if (contactNumber)
        user.contactNumber = contactNumber || user.contactNumber;

      // Save the updated user
      await user.save();

      // Update doctor profile fields
      if (consultantFee)
        doctorProfile.consultantFee =
          consultantFee || doctorProfile.consultantFee;
      if (specialization)
        doctorProfile.specialization =
          specialization || doctorProfile.specialization;
      if (availableTimeSlot)
        doctorProfile.availableTimeSlot =
          availableTimeSlot || doctorProfile.availableTimeSlot;
      if (certification)
        doctorProfile.certification =
          certification || doctorProfile.certification;
      if (degrees) doctorProfile.degrees = degrees || doctorProfile.degrees;
      if (experience)
        doctorProfile.experience = experience || doctorProfile.experience;
      // doctorProfile.images = images;

      // Save the updated doctor profile
      await doctorProfile.save();

      const updatedUser = doctorProfile;

      res.status(200).json({
        success: true,
        message: "Doctor profile updated successfully.",
        doctorProfile,
      });
    } else if (accountType == "Patient") {
      const { medicalHistory, medications, allergies, emergencyContact } =
        req.body;

      const patientProfile = await Patient.findOne({ user: userId }).populate(
        "user"
      );
      //await Doctor.findById(userId).populate("user");
      if (!patientProfile) {
        return res.status(404).json({
          success: false,
          message: "Doctor profile not found.",
        });
      }

      console.log("--------> ", patientProfile);

      // Update the User details (firstName, lastName, email, contactNumber)
      const user = await User.findById(patientProfile.user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User associated with this doctor profile not found.",
        });
      }

      // Update common user fields
      if (dateOfBirth) user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      if (gender) user.gender = gender || user.gender;
      if (bloodGroup) user.bloodGroup = bloodGroup || user.bloodGroup;
      if (contactNumber)
        user.contactNumber = contactNumber || user.contactNumber;

      // Save the updated user
      await user.save();

      // Update patient profile fields
      if (dateOfBirth) patientProfile.medicalHistory = medicalHistory;
      if (medications) patientProfile.medications = medications;
      if (allergies) patientProfile.allergies = allergies;
      if (emergencyContact) patientProfile.emergencyContact = emergencyContact;

      // Save the updated patient profile
      await patientProfile.save();

      const updatedUser = patientProfile;

      res.status(200).json({
        success: true,
        message: "Patient profile updated successfully.",
        updatedUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    // Fetch all doctors and populate related user data
    const doctors = await Doctor.find().populate("user");

    // Check if any doctors were found
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully.",
      doctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// controllers/diseaseController.js

exports.getMedicines = async (req, res) => {
  try {
    const { diseaseName } = req.query; // Get the disease name from the query parameter

    if (!diseaseName) {
      return res.status(400).json({ message: "Disease name is required" });
    }

    // Search for the disease in the database (case-insensitive search)
    const disease = await Disease.findOne({
      disease: { $regex: diseaseName, $options: "i" },
    });

    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }

    // Send the disease's allopathic and ayurvedic medicines
    return res.json({
      disease: disease.disease,
      Allopathic: disease.Allopathic,
      Ayurvedic: disease.Ayurvedic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const { firstName, lastName, specialization } = req.query;

    // Build query object to search doctors
    let doctorQuery = {};

    if (specialization) {
      // Add specialization to query if provided
      doctorQuery.specialization = { $regex: specialization, $options: "i" }; // Case-insensitive search
    }

    // Search for doctors based on firstName or lastName by referencing User schema
    const userQuery = {};
    if (firstName) {
      userQuery.firstName = { $regex: firstName, $options: "i" };
    }
    if (lastName) {
      userQuery.lastName = { $regex: lastName, $options: "i" };
    }

    // Find users matching firstName or lastName
    const matchedUsers = await User.find(userQuery).select("_id");

    // If no matching users found, return an empty list
    if (matchedUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching your name criteria" });
    }

    // Add condition to the doctor query to match doctors with the corresponding user IDs
    doctorQuery.user = { $in: matchedUsers.map((user) => user._id) };

    // Search for doctors based on the query object
    const doctors = await Doctor.find(doctorQuery)
      .populate(
        "user",
        "firstName lastName email contactNumber image accountType"
      ) // Populate user data
      .exec();

    // If no doctors found, return a 404 message
    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "No doctors found matching your criteria" });
    }

    // Return the found doctors
    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(req.params)

    // Find and delete doctor
    const deletedDoctor = await Doctor.deleteOne({ userId });
    const deletedUser = await User.deleteOne({userId });

    if (!deletedDoctor && !deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete patient
    const deletedPatient = await Patient.findByIdAndDelete({user:userId});
    const deletedUser = await User.findByIdAndDelete({_id:userId});

    if (!deletedPatient || !deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
