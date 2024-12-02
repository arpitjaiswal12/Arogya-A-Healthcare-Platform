import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile.js";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import OtpVerification from "./components/OtpVerification";
import DoctorsTable from "./components/DoctorsTable.js";
import DiseaseSearch from "./pages/DiseaseSearch.js";
import PatientBookings from "./components/PatientBookings.js";
import DoctorBookings from "./components/DoctorBookings.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="w-full h-full bg-[#fdfdfb] flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/get-checkup-done" element={<DoctorsTable />} />
        <Route path="/search-disease" element={<DiseaseSearch />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
