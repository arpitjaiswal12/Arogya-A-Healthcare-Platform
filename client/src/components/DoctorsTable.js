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
        } else {
          toast.error(data.message || "Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors. Please try again later.");
      }
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
    } else {
      toast.error("Please log in to book an appointment.");
      navigate("/login");
    }
  };

  return (
    <div className="justify-center flex-col">
      {/* Search Filters */}
      {selectedDoctor ? (
        <AppointmentForm doctor={selectedDoctor} user={currentUser.user} />
      ) : (
        <div className="m-5">
          <div className="text-center mb-4">
            <h1 className="text-2xl  font-bold mb-4">Doctor List</h1>
          </div>

          {/* Search Filters */}
          <div className="flex justify-center items-center mb-4 space-x-4">
            <input
              type="text"
              placeholder="Search by Name"
              className="border px-4 py-2 rounded mr-4"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Specialization"
              className="border px-4 py-2 rounded"
              value={searchSpecialization}
              onChange={(e) => setSearchSpecialization(e.target.value)}
            />
            <button
              onClick={searchDoctors}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 ml-4"
            >
              Search
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 text-left">Profile</th>
                  <th className=" w-40  py-2 px-4 border-b-2 text-left">Doctor Name</th>
                  <th className="py-2 px-4 border-b-2 text-left">
                    Contact Number
                  </th>
                  <th className=" w-40 py-2 px-4 border-b-2 text-left">
                    Available Slot
                  </th>
                  <th className="py-2 px-4 border-b-2 text-left">
                    Consultant Fee
                  </th>
                  <th className=" w-60 py-2 px-4 border-b-2 text-left">
                    Specialization
                  </th>
                  <th className="py-2 px-4 border-b-2"></th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="py-2 px-4 border-b-2">
                      <img
                        src={doctor.user.image}
                        alt={`${doctor.user.firstName} ${doctor.user.lastName}`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b-2">
                      Dr. {doctor.user.firstName} {doctor.user.lastName}
                    </td>
                    <td className="py-2 px-4 border-b-2">
                      {doctor.user.contactNumber}
                    </td>
                    <td className="py-2 px-4 border-b-2">
                      {doctor.availableTimeSlot}
                    </td>
                    <td className="py-2 px-4 border-b-2">
                      ₹{doctor.consultantFee}
                    </td>
                    <td className="py-2 px-4 border-b-2">
                      {doctor.specialization}
                    </td>
                    <td className="py-2 px-4 border-b-2">
                      <button
                        onClick={() => handleBookAppointment(doctor)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                      >
                        Book Appointment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
