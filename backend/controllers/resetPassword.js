const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// Controller for Resetting Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    // Validate request fields
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Find the latest OTP for the email
    const otpRecord = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (otpRecord.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or has expired.",
      });
    }

    // Verify the OTP
    if (otp !== otpRecord[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Send notification email
    try {
      const emailResponse = await mailSender(
        email,
        "Password Reset Confirmation",
        passwordUpdated(
          email,
          `Your password has been reset successfully.`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email.",
        error: error.message,
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while resetting password.",
      error: error.message,
    });
  }
};
