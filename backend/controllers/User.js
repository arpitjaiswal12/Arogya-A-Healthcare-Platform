const User = require("../models/User.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");

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
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.gender = gender || user.gender;
      user.bloodGroup = bloodGroup || user.bloodGroup;
      user.contactNumber = contactNumber || user.contactNumber;

      // Save the updated user
      await user.save();

      // Update doctor profile fields
      doctorProfile.consultantFee = consultantFee;
      doctorProfile.specialization = specialization;
      doctorProfile.availableTimeSlot = availableTimeSlot;
      doctorProfile.certification = certification;
      doctorProfile.degrees = degrees;
      doctorProfile.experience = experience;
      // doctorProfile.images = images;

      // Save the updated doctor profile
      await doctorProfile.save();

      const updatedUser = doctorProfile;

      res.status(200).json({
        success: true,
        message: "Doctor profile updated successfully.",
        updatedUser,
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
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.gender = gender || user.gender;
      user.bloodGroup = bloodGroup || user.bloodGroup;
      user.contactNumber = contactNumber || user.contactNumber;

      // Save the updated user
      await user.save();

      // Update patient profile fields
      patientProfile.medicalHistory = medicalHistory;
      patientProfile.medications = medications;
      patientProfile.allergies = allergies;
      patientProfile.emergencyContact = emergencyContact;

      // Save the updated patient profile
      await patientProfile.save();

      const updatedUser=patientProfile;

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
