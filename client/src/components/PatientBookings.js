import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";


const PatientBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.user.id || currentUser.user._id)

  // Fetch bookings on button click
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/patients-bookings/${currentUser.user.id || currentUser.user._id}`
      );
      const data = await response.json();
      console.log(data)
      if (response.ok && data.status === "success") {
        setBookings(data.data);
        toast.success("Bookings fetched successfully");
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    }
    setLoading(false);
  };

  // Delete booking
  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/user/delete-appointment/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
        toast.success("Booking deleted successfully");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error during booking deletion:", error);
      toast.error("Failed to delete booking");
    }
  };


  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Patient Bookings</h1> */}
      <button
        onClick={fetchBookings}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Loading..." : "View Bookings"}
      </button>
      {bookings.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                {/* <th className="px-4 py-2 border">Doctor First Name</th>
                <th className="px-4 py-2 border">Doctor Last Name</th> */}
                <th className="px-4 py-2 border">Doctor Name</th>
                <th className="px-4 py-2 border">Contact Number</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Day</th>
                <th className="px-4 py-2 border">Time Slot</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                  Dr. {booking.doctor.user.firstName} {booking.doctor.user.lastName}
                  </td>
                  <td className="px-4 py-2 border">
                    {booking.doctor.user.contactNumber}
                  </td>
                  <td className="px-4 py-2 border">
                    {booking.paymentStatus ? "Paid" : "Unpaid"}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{booking.day}</td>
                  <td className="px-4 py-2 border">
                    {booking.timeSlot.start} - {booking.timeSlot.end}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings search yet.</p>
      )}
    </div>
  );
};

export default PatientBookings;
