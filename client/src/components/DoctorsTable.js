import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AppointmentForm from "./AppointmentForm";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/user/doctors`
        );
        const data = await response.json();

        if (data.success) {
          setDoctors(data.doctors);
          console.log(doctors);
        } else {
          toast.error(data.message || "Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors. Please try again later.");
      }
      console.log(doctors);
    };

    fetchDoctors();
  }, []);

  // Render the AppointmentForm with selected doctor and user

  // filter doctors based on name or specialization
  const searchDoctors = async () => {
    try {
      let url = `${process.env.REACT_APP_BACKEND_URL}api/v1/user/search-doctors`; // Base URL

      if (searchName || searchSpecialization) {
        url += "?"; // Start the query string
      }

      if (searchName) {
        // Split searchName into firstName and lastName
        const nameParts = searchName.split(" ");
        const firstName = nameParts[0];
        const lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""; // Handle multiple words in name

        // Append firstName and lastName to the URL
        if (firstName) url += `firstName=${firstName}&`; // Add firstName if available
        if (lastName) url += `lastName=${lastName}&`; // Add lastName if available
      }

      if (searchSpecialization) {
        // Append specialization if available
        url += `specialization=${searchSpecialization}&`;
      }

      // Remove the trailing '&' or '?' if there is no query parameter
      if (url.endsWith("&") || url.endsWith("?")) {
        url = url.slice(0, -1);
      }

      // Fetch filtered doctors based on constructed URL
      const response = await fetch(url);
      const data = await response.json();

      if (data.doctors) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "No doctors found matching your criteria");
      }
    } catch (error) {
      console.error("Error searching doctors:", error);
      toast.error("Error searching doctors. Please try again later.");
    }
  };

  // Handle booking appointment
  const handleBookAppointment = async (doctor) => {
    if (currentUser) {
      setSelectedDoctor(doctor);
      console.log(doctor.user.image);
    } else {
      toast.error("Please log in to book an appointment.");
      navigate("/login");
    }
  };

  return (
    <div className="justify-center flex-col">
      {selectedDoctor ? (
        <AppointmentForm doctor={selectedDoctor} user={currentUser.user} />
      ) : (
        <div className="m-5">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Doctor List
            </h1>
          </div>

          {/* Search Filters */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by Name"
              className="border px-4 py-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all w-full sm:w-auto"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Specialization"
              className="border px-4 py-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all w-full sm:w-auto"
              value={searchSpecialization}
              onChange={(e) => setSearchSpecialization(e.target.value)}
            />
            <button
              onClick={searchDoctors}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:from-green-600 hover:to-teal-600 transition-all ease-in-out duration-200 w-full sm:w-auto"
            >
              Search
            </button>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto mt-10">
            {/* Desktop View */}
            <table className="min-w-full bg-white shadow-md rounded-lg hidden md:table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b-2 text-left text-sm font-semibold text-gray-800">
                    Profile
                  </th>
                  <th className="py-3 px-4 border-b-2 text-left text-sm font-semibold text-gray-800">
                    Doctor Name
                  </th>
                  <th className="py-3 px-4 border-b-2 text-left text-sm font-semibold text-gray-800">
                    Contact Number
                  </th>
                  <th className="py-3 px-4 border-b-2 text-left text-sm font-semibold text-gray-800">
                    Available Slot
                  </th>
                  <th className="py-3 px-4 border-b-2 text-left text-sm font-semibold text-gray-800">
                    Consultant Fee
                  </th>
                  <th className="py-3 px-4 border-b-2 text-left text-sm font-semibold text-gray-800">
                    Specialization
                  </th>
                  <th className="py-3 px-4 border-b-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <tr
                    key={doctor._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-200 transition-all duration-200`}
                  >
                    <td className="py-3 px-4">
                      <img
                        src={doctor.user?.image || ""}
                        alt={`${doctor.user?.firstName || ""} ${
                          doctor.user?.lastName || ""
                        }`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-700">
                      Dr. {doctor.user?.firstName || ""}{" "}
                      {doctor.user?.lastName || ""}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {doctor?.user?.contactNumber || ""}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {doctor?.availableTimeSlot?.start || ""} -{" "}
                      {doctor?.availableTimeSlot?.end || ""}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      ₹{doctor?.consultantFee || ""}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {doctor?.specialization || ""}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <button
                        onClick={() => handleBookAppointment(doctor)}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:from-green-600 hover:to-teal-600 transition-all ease-in-out duration-200"
                      >
                        Book Appointment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="flex flex-col space-y-4 md:hidden">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white shadow-md rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={doctor.user?.image || ""}
                      alt={`${doctor.user?.firstName || ""} ${
                        doctor.user?.lastName || ""
                      }`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        Dr. {doctor.user?.firstName || ""}{" "}
                        {doctor.user?.lastName || ""}
                      </h2>
                      <p className=" text-base text-gray-600">
                        {doctor?.specialization || ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-base text-gray-800">
                    <p>
                      <strong>Contact:</strong>{" "}
                      {doctor?.user?.contactNumber || ""}
                    </p>
                    <p>
                      <strong>Available Slot:</strong>{" "}
                      {doctor?.availableTimeSlot?.start || ""} -{" "}
                      {doctor?.availableTimeSlot?.end || ""}
                    </p>
                    <p>
                      <strong>Consultant Fee:</strong> ₹
                      {doctor?.consultantFee || ""}
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:from-green-600 hover:to-teal-600 transition-all ease-in-out duration-200"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
