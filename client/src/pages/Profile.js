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
  console.log("current user :", currentUser);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setFormData({
        firstName: currentUser?.user?.firstName,
        lastName: currentUser?.user?.lastName,
        email: currentUser?.user?.email,
        contactNumber: currentUser?.user?.contactNumber,
        image: currentUser?.user?.image,
        accountType: currentUser?.user?.accountType,
        password: "",
        dateOfBirth: currentUser?.user?.dateOfBirth,
        gender: currentUser?.user?.gender,
        bloodGroup: currentUser?.user?.bloodGroup,
        availableTimeSlot: currentUser?.availableTimeSlot || "",
        consultantFee: currentUser?.consultantFee || "",
        specialization: currentUser?.specialization || "",
        degrees: currentUser?.degrees || "",
        experience: currentUser?.experience || "",
        certification: currentUser?.certification || "",
        allergies:
          currentUser?.currentType?.allergies || currentUser?.allergies || "",
        emergencyContact: currentUser?.currentType?.emergencyContact || "",
        medicalHistory: currentUser?.currentType?.medicalHistory || "",
        medications: currentUser?.currentType?.medications || "",
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
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/update-profile/${currentUser.user.id}`,
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
                  <option value="Cardiology - Heart Attack, Hypertension, Arrhythmia, Coronary Artery Disease, Heart Failure">
                    Cardiology - "Heart Attack", "Hypertension", "Arrhythmia",
                    "Coronary Artery Disease", "Heart Failure"
                  </option>
                  <option value="Dermatology - Eczema, Psoriasis, Acne, Skin Cancer, Rosacea">
                    Dermatology - "Eczema", "Psoriasis", "Acne", "Skin Cancer",
                    "Rosacea"
                  </option>
                  <option value="Endocrinology - Diabetes, Thyroid Disease, Osteoporosis, Cushing's Syndrome, Addison's Disease">
                    Endocrinology - "Diabetes", "Thyroid Disease",
                    "Osteoporosis", "Cushing's Syndrome", "Addison's Disease"
                  </option>
                  <option value="Gastroenterology - IBS, GERD, Hepatitis, Crohn's Disease, Ulcerative Colitis">
                    Gastroenterology - "IBS", "GERD", "Hepatitis", "Crohn's
                    Disease", "Ulcerative Colitis"
                  </option>
                  <option value="Neurology - Stroke, Alzheimer's Disease, Migraine, Epilepsy, Multiple Sclerosis">
                    Neurology - "Stroke", "Alzheimer's Disease", "Migraine",
                    "Epilepsy", "Multiple Sclerosis"
                  </option>
                  <option value="Oncology - Breast Cancer, Lung Cancer, Lymphoma, Leukemia, Prostate Cancer">
                    Oncology - "Breast Cancer", "Lung Cancer", "Lymphoma",
                    "Leukemia", "Prostate Cancer"
                  </option>
                  <option value="Orthopedics - Arthritis, Fracture, Osteoporosis, Tendonitis, Carpal Tunnel Syndrome">
                    Orthopedics - "Arthritis", "Fracture", "Osteoporosis",
                    "Tendonitis", "Carpal Tunnel Syndrome"
                  </option>
                  <option value="Pediatrics - Asthma, Chickenpox, Common Cold, ADHD, Measles">
                    Pediatrics - "Asthma", "Chickenpox", "Common Cold", "ADHD",
                    "Measles"
                  </option>
                  <option value="Psychiatry - Depression, Anxiety, Bipolar Disorder, Schizophrenia, PTSD">
                    Psychiatry - "Depression", "Anxiety", "Bipolar Disorder",
                    "Schizophrenia", "PTSD"
                  </option>
                  <option value="Pulmonology - Asthma, COPD, Lung Cancer, Tuberculosis, Pneumonia">
                    Pulmonology - "Asthma", "COPD", "Lung Cancer",
                    "Tuberculosis", "Pneumonia"
                  </option>
                  <option value="Radiology - Bone Fracture Detection, Lung Cancer Screening, Breast Cancer Detection, MRI Abnormalities, CT Scans">
                    Radiology - "Bone Fracture Detection", "Lung Cancer
                    Screening", "Breast Cancer Detection", "MRI Abnormalities",
                    "CT Scans"
                  </option>
                  <option value="Rheumatology - Rheumatoid Arthritis, Lupus, Gout, Osteoarthritis, Scleroderma">
                    Rheumatology - "Rheumatoid Arthritis", "Lupus", "Gout",
                    "Osteoarthritis", "Scleroderma"
                  </option>
                  <option value="Urology - Kidney Stones, UTI, Prostate Cancer, Bladder Incontinence, Erectile Dysfunction">
                    Urology - "Kidney Stones", "UTI", "Prostate Cancer",
                    "Bladder Incontinence", "Erectile Dysfunction"
                  </option>
                  <option value="Nephrology - Chronic Kidney Disease, Acute Kidney Injury, Kidney Stones, Polycystic Kidney Disease, Nephrotic Syndrome">
                    Nephrology - "Chronic Kidney Disease", "Acute Kidney
                    Injury", "Kidney Stones", "Polycystic Kidney Disease",
                    "Nephrotic Syndrome"
                  </option>
                  <option value="Obstetrics and Gynecology - Pregnancy Complications, Endometriosis, Menopause, PCOS, Uterine Fibroids">
                    Obstetrics and Gynecology - "Pregnancy Complications",
                    "Endometriosis", "Menopause", "PCOS", "Uterine Fibroids"
                  </option>
                  <option value="Ophthalmology - Cataracts, Glaucoma, Macular Degeneration, Diabetic Retinopathy, Conjunctivitis">
                    Ophthalmology - "Cataracts", "Glaucoma", "Macular
                    Degeneration", "Diabetic Retinopathy", "Conjunctivitis"
                  </option>
                  <option value="Otolaryngology (ENT) - Sinusitis, Tonsillitis, Hearing Loss, Vertigo, Sleep Apnea">
                    Otolaryngology (ENT) - "Sinusitis", "Tonsillitis", "Hearing
                    Loss", "Vertigo", "Sleep Apnea"
                  </option>
                  <option value="Plastic Surgery - Rhinoplasty Complications, Breast Reconstruction, Skin Grafts, Facial Trauma, Burn Repair">
                    Plastic Surgery - "Rhinoplasty Complications", "Breast
                    Reconstruction", "Skin Grafts", "Facial Trauma", "Burn
                    Repair"
                  </option>
                  <option value="Anesthesiology - Chronic Pain, Surgical Anesthesia Management, Pain Management, Postoperative Pain, Nerve Blocks">
                    Anesthesiology - "Chronic Pain", "Surgical Anesthesia
                    Management", "Pain Management", "Postoperative Pain", "Nerve
                    Blocks"
                  </option>
                  <option value="Family Medicine - Hypertension, Diabetes Management, Common Cold, Asthma, Preventive Care">
                    Family Medicine - "Hypertension", "Diabetes Management",
                    "Common Cold", "Asthma", "Preventive Care"
                  </option>
                  <option value="Infectious Disease - HIV/AIDS, Tuberculosis, COVID-19, Hepatitis B, Malaria">
                    Infectious Disease - "HIV/AIDS", "Tuberculosis", "COVID-19",
                    "Hepatitis B", "Malaria"
                  </option>
                  <option value="Geriatrics - Dementia, Osteoporosis, Hypertension, Arthritis, Alzheimer's Disease">
                    Geriatrics - "Dementia", "Osteoporosis", "Hypertension",
                    "Arthritis", "Alzheimer's Disease"
                  </option>
                  <option value="Emergency Medicine - Trauma, Acute Heart Attack, Stroke, Severe Allergies, Poisoning">
                    Emergency Medicine - "Trauma", "Acute Heart Attack",
                    "Stroke", "Severe Allergies", "Poisoning"
                  </option>
                  <option value="Pathology - Cancer Diagnosis, Infectious Disease Identification, Biopsy Analysis, Blood Disorders, Histopathology">
                    Pathology - "Cancer Diagnosis", "Infectious Disease
                    Identification", "Biopsy Analysis", "Blood Disorders",
                    "Histopathology"
                  </option>
                  <option value="Sports Medicine - ACL Injuries, Tennis Elbow, Concussions, Stress Fractures, Rotator Cuff Injuries">
                    Sports Medicine - "ACL Injuries", "Tennis Elbow",
                    "Concussions", "Stress Fractures", "Rotator Cuff Injuries"
                  </option>
                  <option value="Allergy and Immunology - Asthma, Food Allergies, Seasonal Allergies, Eczema, Anaphylaxis">
                    Allergy and Immunology - "Asthma", "Food Allergies",
                    "Seasonal Allergies", "Eczema", "Anaphylaxis"
                  </option>
                  <option value="Pain Management - Chronic Back Pain, Neuropathy, Fibromyalgia, Arthritis Pain, Cancer Pain">
                    Pain Management - "Chronic Back Pain", "Neuropathy",
                    "Fibromyalgia", "Arthritis Pain", "Cancer Pain"
                  </option>
                  <option value="Preventive Medicine - Vaccination, Smoking Cessation, Diabetes Prevention, Obesity Management, Blood Pressure Management">
                    Preventive Medicine - "Vaccination", "Smoking Cessation",
                    "Diabetes Prevention", "Obesity Management", "Blood Pressure
                    Management"
                  </option>
                  <option value="Neurosurgery - Brain Tumors, Spinal Cord Injury, Aneurysms, Epilepsy Surgery, Chronic Pain Disorders">
                    Neurosurgery - "Brain Tumors", "Spinal Cord Injury",
                    "Aneurysms", "Epilepsy Surgery", "Chronic Pain Disorders"
                  </option>
                  <option value="Vascular Surgery - Aneurysm, Carotid Artery Disease, Peripheral Artery Disease, Varicose Veins, Deep Vein Thrombosis">
                    Vascular Surgery - "Aneurysm", "Carotid Artery Disease",
                    "Peripheral Artery Disease", "Varicose Veins", "Deep Vein
                    Thrombosis"
                  </option>
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
                  value={formData.medicalHistory || ""}
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
                  value={formData.medications || ""}
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
                  value={formData.allergies || ""}
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
