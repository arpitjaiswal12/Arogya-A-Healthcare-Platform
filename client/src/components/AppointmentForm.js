import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; // Import uuid library for unique IDs

const AppointmentForm = ({ doctor, user }) => {
  const [description, setDescription] = useState("");

  const handlePayment = async () => {
    const transactionID = uuidv4(); // Generate unique transaction ID

    const paymentData = {
      transactionID, // Pass transaction ID to payment data
      name: `${user.firstName} ${user.lastName}`,
      mobileNumber: user.contactNumber,
      amount: doctor.consultantFee,
      description,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Redirecting to payment page...");
        setTimeout(() => {
          window.location.href = result.url;
        }, 2000);
      } else {
        toast.error(result.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
      toast.error("Error during payment. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.freepik.com/free-photo/copy-space-agenda-pills_23-2148550998.jpg?t=st=1731239917~exp=1731243517~hmac=ca9d4e21c9d47c8fa5883f6edd256cad701f61103d38b41da0a3300c5d097fa1&w=1380')] flex items-center justify-center">
      <div className="max-w-lg mx-auto p-8 mt-5 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Appointment Form
        </h1>

        <div className="space-y-6">
          {/* User and Doctor Info */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-medium text-gray-700">
                <strong>Patient Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-600">
                <strong>Contact Number:</strong> {user.contactNumber}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">
                <strong>Doctor Name:</strong> Dr. {doctor.user.firstName}{" "}
                {doctor.user.lastName}
              </p>
              <p className="text-gray-600">
                <strong>Doctor Contact Number:</strong>{" "}
                {doctor.user.contactNumber}
              </p>
              <p className="text-gray-600">
                <strong>Consultation Fee:</strong> ₹{doctor.consultantFee}
              </p>
              <p className="text-gray-600">
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
            </div>
          </div>

          {/* Description Box */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-300 transition"
              placeholder="Add any notes for the doctor here..."
            />
          </div>

          {/* Buy Ticket Button */}
          <div className="flex justify-center">
            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
