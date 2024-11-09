import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
} from "../redux/Slices/userSlice.js";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setFormData({
        firstName: currentUser.user.firstName,
        lastName: currentUser.user.lastName,
        email: currentUser.user.email,
        contactNumber: currentUser.user.contactNumber,
        image: currentUser.user.image,
        accountType: currentUser.user.accountType,
        password: "",
        dateOfBirth: currentUser.user.dateOfBirth,
        gender: currentUser.user.gender,
        bloodGroup: currentUser.user.bloodGroup,
        availableTimeSlot: currentUser.availableTimeSlot || "",
        consultantFee: currentUser.consultantFee || "",
        specialization: currentUser.specialization || "",
        degrees: currentUser.degrees || "",
        experience: currentUser.experience || "",
        certification: currentUser.certification || "",
        allergies: currentUser.allergies || "",
        emergencyContact: currentUser.emergencyContact || "",
        medicalHistory: currentUser.medicalHistory || "",
        medications: currentUser.medications || "",
      });
    }
  }, [currentUser]);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/auth/update-profile/${currentUser.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(updateUserSuccess(data.updatedUser));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/auth/logout`
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data));
      navigate("/login");
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              alt="profile"
              src={formData.image || ""}
              className="rounded-full h-24 w-24 object-cover cursor-pointer"
            />
          </div>

          {/* Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.firstName}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.lastName}
              />
            </div>
          </div>

          {/* Email and Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.email}
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={type}
                id="password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <span onClick={handleToggle} className="cursor-pointer">
              <Icon icon={icon} size={20} />
            </span>
          </div>

          {/* Date of Birth, Gender, Blood Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conditional Doctor and Patient Fields */}
          {currentUser && currentUser.user.accountType === "Doctor" && (
            <>
              <div>
                <label
                  htmlFor="availableTimeSlot"
                  className="block text-sm font-medium text-gray-700"
                >
                  Available Time Slot
                </label>
                <input
                  type="text"
                  id="availableTimeSlot"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.availableTimeSlot}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="availableTimeSlot"
                  className="block text-sm font-medium text-gray-700"
                >
                  consultant Fee
                </label>
                <input
                  type="number"
                  id="consultantFee"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.consultantFee}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specialization
                </label>
                <select
                  id="specialization"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="">Select Specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Rheumatology">Rheumatology</option>
                  <option value="Urology">Urology</option>
                  <option value="Nephrology">Nephrology</option>
                  <option value="Obstetrics and Gynecology">
                    Obstetrics and Gynecology
                  </option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Otolaryngology (ENT)">
                    Otolaryngology (ENT)
                  </option>
                  <option value="Plastic Surgery">Plastic Surgery</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Family Medicine">Family Medicine</option>
                  <option value="Infectious Disease">Infectious Disease</option>
                  <option value="Geriatrics">Geriatrics</option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Sports Medicine">Sports Medicine</option>
                  <option value="Allergy and Immunology">
                    Allergy and Immunology
                  </option>
                  <option value="Pain Management">Pain Management</option>
                  <option value="Preventive Medicine">
                    Preventive Medicine
                  </option>
                  <option value="Neurosurgery">Neurosurgery</option>
                  <option value="Vascular Surgery">Vascular Surgery</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="degrees"
                  className="block text-sm font-medium text-gray-700"
                >
                  Degrees
                </label>
                <input
                  type="text"
                  id="degrees"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.degrees}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="certification"
                  className="block text-sm font-medium text-gray-700"
                >
                  Certifications
                </label>
                <textarea
                  id="certification"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  value={formData.certification}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {currentUser && currentUser.user.accountType === "Patient" && (
            <>
              <div>
                <label
                  htmlFor="medicalHistory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medical History
                </label>
                <textarea
                  id="medicalHistory"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.medicalHistory || []}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="medications"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medications
                </label>
                <textarea
                  id="medications"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.medications || []}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allergies
                </label>
                <input
                  type="text"
                  id="allergies"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.allergies || []}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Emergency Contact
                </label>
                <textarea
                  id="emergencyContact"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.emergencyContact || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Logout Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleLogout}
            className="text-red-600 font-medium hover:text-red-700"
          >
            Sign out
          </button>
        </div>

        {/* Error or Success Messages */}
        <p className="mt-3 text-red-600">{error ? error : ""}</p>
        <p className="mt-3 text-green-600">
          {updateSuccess ? "User profile updated successfully!" : ""}
        </p>
      </div>
    </div>
  );
}
