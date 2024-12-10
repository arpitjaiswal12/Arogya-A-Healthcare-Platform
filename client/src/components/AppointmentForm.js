import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; // Import uuid library for unique IDs

const AppointmentForm = ({ doctor, user }) => {
  const [description, setDescription] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // console.log(doctor._id);

  // console.log(slotDate);

  // console.log(user.id);

  // Example list of available time slots

  const handlePayment = async () => {
    try {
      // Validate required fields
      if (!slotDate || !startTime || !endTime) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // Appointment data setup

      const appointmentData = {
        user: user.id,
        doctor: doctor._id,
        date: slotDate,
        timeSlot: {
          start: startTime,
          end: endTime,
        },
        description,
        paymentStatus: false, // Payment status is false initially
      };

      // Book the appointment
      const appointmentResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/book-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      // Handle appointment booking response
      if (!appointmentResponse.ok) {
        const errorData = await appointmentResponse.json();
        toast.error(errorData.message || "Failed to book appointment...");
        return;
      }

      toast.success("Your appointment is booked.");

      // Payment data setup
      const transactionID = uuidv4(); // Generate unique transaction ID
      const paymentData = {
        transactionID,
        name: `${user.firstName} ${user.lastName}`,
        mobileNumber: user.contactNumber,
        amount: doctor.consultantFee,
      };

      // Initiate payment
      const paymentResponse = await fetch(
        `${process.env.REACT_APP_PAYMENT_GATEWAY_LINK}api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const paymentResult = await paymentResponse.json();

      // Handle payment response
      if (paymentResponse.ok && paymentResult.url) {
        toast.success("Redirecting to payment page...");
        setTimeout(() => {
          window.location.href = paymentResult.url; // Redirect to payment page
        }, 2000);
      } else {
        toast.error(paymentResult.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
      toast.error("Error during payment. Please try again later.");
    }
  };

  const fetchBookedAppointments = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/available-appointment/${doctor._id}`
      );
      const data = await response.json();

      if (response.ok) {
        setBookedSlots(data.bookedTimeSlots);
        setShowModal(true);
      } else {
        toast.error(data.message || "Failed to fetch booked appointments.");
      }
    } catch (error) {
      toast.error("Error fetching appointments. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.freepik.com/free-photo/copy-space-agenda-pills_23-2148550998.jpg?t=st=1731239917~exp=1731243517~hmac=ca9d4e21c9d47c8fa5883f6edd256cad701f61103d38b41da0a3300c5d097fa1&w=1380')] flex items-center justify-center">
      <div className="max-w-xl p-8 m-5 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Appointment Form
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Details */}
          <div>
            <strong className="text-green-700 font-serif text-lg">
              Doctor Details
            </strong>
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
              {doctor?.availableDays?.length > 0 && (
                <div>
                  <strong className="text-gray-600">Available Days:</strong>
                  <ul>
                    {doctor.availableDays.map((day) => (
                      <li key={day} className="text-gray-900">
                        {day}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <label
                  htmlFor="availableTimeSlot"
                  className="block font-medium text-gray-600 mb-2"
                >
                  <strong>Available Time Slot </strong>
                </label>
                {/* {console.log(doctor?.availableTimeSlot)} */}
                <div className="flex space-x-4">
                  <input
                    type="time"
                    id="start"
                    value={doctor?.availableTimeSlot?.start || ""}
                    disabled
                    className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="time"
                    id="end"
                    value={doctor?.availableTimeSlot?.end || ""}
                    disabled
                    className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={fetchBookedAppointments}
                  className="px-2 py-3 text-gray-700 rounded-lg hover:text-blue-700 bg-transparent"
                >
                  View Booked Appointments
                </button>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div>
            <strong className="text-red-700 font-serif text-lg">
              Patient Details
            </strong>
            <div>
              <p className="font-medium text-gray-700">
                <strong>Patient Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-600">
                <strong>Contact Number:</strong> {user.contactNumber}
              </p>
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block font-medium text-gray-600"
              >
                <strong>Select Date </strong>
              </label>
              <input
                type="date"
                id="slotdate"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setSlotDate(e.target.value)}
                required
              />
            </div>
            <label
              htmlFor="timeSlot"
              className="block font-medium text-gray-600 mb-2"
            >
              <strong> Time Slot</strong>
            </label>
            <div className="flex space-x-4">
              <input
                type="time"
                id="start"
                value={startTime}
                className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setStartTime(e.target.value)}
              />
              <input
                type="time"
                id="end"
                value={endTime}
                className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-600 mb-2"
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
          </div>
        </div>

        {/* Book Slot Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePayment}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
          >
            Book Slot
          </button>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-0">
      {/* Modal Header */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
        Booked Appointments
      </h2>
      
      {/* Booked Slots */}
      {bookedSlots ? (
        Object.entries(bookedSlots).map(([date, details]) => (
          <div key={date} className="mb-4">
            <h3 className="font-medium text-center sm:text-left">
              {date} ({details.day})
            </h3>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {details.timeSlots.map((slot, index) => (
                <li key={index} className="text-center sm:text-left">
                  {slot.start} - {slot.end}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center sm:text-left">No bookings available.</p>
      )}
      
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg w-full sm:w-auto"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default AppointmentForm;
