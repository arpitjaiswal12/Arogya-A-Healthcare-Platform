const User = require("../models/User.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");
const Disease = require("../models/Disease.js");
const Appointment = require("../models/Appointment.js");

exports.updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId); // Assuming the doctorId is passed in the URL
    const { accountType } = req.body;

    console.log(accountType);

    if (accountType == "Doctor") {
      // Find the existing doctor profile

      // const {
      //   availableDays,
      //   timeSlot,
      //   consultantFee,
      //   specialization,
      //   experience,
      //   degrees,
      //   certification,
      // } = req.body;

      const doctorProfile = await Doctor.findOneAndUpdate(
        { user: userId },
        req.body,
        { new: true }
      ).populate("user");
      //await Doctor.findById(userId).populate("user");
      if (!doctorProfile) {
        return res.status(404).json({
          success: false,
          message: "Doctor profile not found.",
        });
      }

      console.log("--------> ", doctorProfile);

      // Update the User details (firstName, lastName, email, contactNumber)
      const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User associated with this doctor profile not found.",
        });
      }

      // Update common user fields
      // if (dateOfBirth) user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      // if (gender) user.gender = gender || user.gender;
      // if (bloodGroup) user.bloodGroup = bloodGroup || user.bloodGroup;
      // if (contactNumber)
      //   user.contactNumber = contactNumber || user.contactNumber;

      // Save the updated user
      // await user.save();

      // // Update doctor profile fields
      // if (consultantFee)
      //   doctorProfile.consultantFee =
      //     consultantFee || doctorProfile.consultantFee;
      // if (specialization)
      //   doctorProfile.specialization =
      //     specialization || doctorProfile.specialization;
      // // if (availableTimeSlot)
      // //   doctorProfile.availableTimeSlot =
      // //     availableTimeSlot || doctorProfile.availableTimeSlot;
      // if (certification)
      //   doctorProfile.certification =
      //     certification || doctorProfile.certification;
      // if (degrees) doctorProfile.degrees = degrees || doctorProfile.degrees;
      // if (experience)
      //   doctorProfile.experience = experience || doctorProfile.experience;
      // if (timeSlot) doctorProfile.timeSlot = timeSlot || doctorProfile.timeSlot;
      // if (availableDays)
      //   doctorProfile.availableDays =
      //     availableDays || doctorProfile.availableDays;
      // // doctorProfile.images = images;

      // console.log("79===>", doctorProfile.timeSlot);
      // console.log("850=>>", availableDays);

      // // Save the updated doctor profile
      // await doctorProfile.save();

      // const updatedUser = doctorProfile;

      res.status(200).json({
        success: true,
        message: "Doctor profile updated successfully.",
        doctorProfile,
      });
    } else if (accountType == "Patient") {
      const patientProfile = await Patient.findOneAndUpdate(
        { user: userId },
        req.body,
        { new: true }
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
      const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User associated with this doctor profile not found.",
        });
      }

      const updatedUser = patientProfile;
      console.log(user)

      res.status(200).json({
        success: true,
        message: "Patient profile updated successfully.",
        updatedUser
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
    console.log(req.params);

    // Find and delete doctor
    const deletedDoctor = await Doctor.deleteOne({ userId });
    const deletedUser = await User.deleteOne({ userId });

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
    const deletedPatient = await Patient.findByIdAndDelete({ user: userId });
    const deletedUser = await User.findByIdAndDelete({ _id: userId });

    if (!deletedPatient || !deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { user, doctor, date, timeSlot, description, paymentStatus } =
      req.body;

    // Convert date string to Date object if it's a string
    const appointmentDate = new Date(date);

    // Fetch the doctor's available time slots from the Doctor schema
    const doctorDetails = await Doctor.findById(doctor);

    if (!doctorDetails) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const { availableTimeSlot } = doctorDetails;

    // Ensure the user's selected time slot is within the doctor's available time slot
    if (
      timeSlot.start < availableTimeSlot.start ||
      timeSlot.end > availableTimeSlot.end
    ) {
      return res.status(400).json({
        success: false,
        message: `The selected time slot is outside the doctor's available time range of ${availableTimeSlot.start} to ${availableTimeSlot.end}.`,
      });
    }

    // Validate the duration of the time slot (minimum 15 minutes, maximum 45 minutes)
    const startTime = new Date(`1970-01-01T${timeSlot.start}:00Z`);
    const endTime = new Date(`1970-01-01T${timeSlot.end}:00Z`);
    const duration = (endTime - startTime) / (1000 * 60); // Duration in minutes

    if (duration < 15 || duration > 45) {
      return res.status(400).json({
        success: false,
        message:
          "The time slot must be at least 15 minutes and at most 45 minutes long.",
      });
    }

    // Check if any existing appointment overlaps with the new time slot
    const overlappingAppointment = await Appointment.findOne({
      doctor,
      date: appointmentDate,
      $or: [
        {
          "timeSlot.start": { $lt: timeSlot.end },
          "timeSlot.end": { $gt: timeSlot.start },
        },
      ],
    });

    if (overlappingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked for the selected doctor.",
      });
    }

    // Create and save a new appointment
    let appointment = new Appointment({
      patient: user,
      doctor,
      date: appointmentDate,
      timeSlot,
      description,
      paymentStatus: paymentStatus || false, // default to false if not provided
    });

    // Save the appointment first
    await appointment.save();

    // Now populate the fields after saving
    appointment = await Appointment.findById(appointment._id)
      .populate("patient")
      .populate("doctor");

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to book appointment.",
    });
  }
};

exports.getBookedTimeSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find all appointments for the given doctor
    const appointments = await Appointment.find(
      { doctor: doctorId },
      "date day timeSlot"
    )
      .sort({ date: 1, "timeSlot.start": 1 }) // Optional: Sort by date and start time
      .lean();

    if (!appointments.length) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for the given doctor.",
      });
    }

    // Format the response to group by date
    const groupedTimeSlots = appointments.reduce((acc, appointment) => {
      const dateKey = appointment.date.toISOString().split("T")[0]; // Format: YYYY-MM-DD'
      const dayOfWeek = appointment.day;

      if (!acc[dateKey]) {
        acc[dateKey] = {
          day: dayOfWeek,
          timeSlots: [],
        };
      }

      acc[dateKey].timeSlots.push(appointment.timeSlot);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: "Booked time slots retrieved successfully.",
      bookedTimeSlots: groupedTimeSlots,
    });
  } catch (error) {
    console.error("Error fetching booked time slots:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to fetch booked time slots.",
    });
  }
};

exports.getAppointmentsByDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;

  // Fetch appointments by doctor ID
  const appointments = await Appointment.find({ doctor: doctorId }).populate(
    "patient",
    "firstName lastName contactNumber accountType gender"
  );

  if (!appointments || appointments.length === 0) {
    return res
      .status(400)
      .json({ message: "No appointments found for this doctor" });
  }

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: appointments,
  });
};

exports.getAppointmentsByPatient = async (req, res, next) => {
  const patientId = req.params.patientId;

  // Fetch appointments by patient ID
  // const appointments = await Appointment.find({ patient: patientId }).populate('doctor', "user");

  // const appointments = await Appointment.find({ patient: patientId }).populate({
  //   path: "doctor",
  //   populate: {
  //     path: "user", // Assuming `user` is a field in the `doctor` schema
  //     model: "User",
  //     "firstName lastName contactNumber gender accountType"
  //   },
  // });

  const appointments = await Appointment.find({ patient: patientId }).populate({
    path: "doctor",
    select: "consultantFee", // Only select consultantFee from the doctor model
    populate: {
      path: "user", // Assuming `user` is a field in the doctor schema
      model: "User",
      select: "firstName lastName contactNumber gender accountType", // Only select specific fields from the user model
    },
  });

  if (!appointments || appointments.length === 0) {
    return res
      .status(400)
      .json({ message: "No appointments found for this patient" });
  }

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: appointments,
  });
};
