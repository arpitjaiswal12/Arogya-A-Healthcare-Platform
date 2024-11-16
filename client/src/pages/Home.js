import React from "react";
import bg from "../assets/WhatsApp Image 2023-09-17 at 3.12.02 PM.jpeg";
import leftimg from "../assets/High Five transition for the latest project.gif";
import rightimg from "../assets/back-left-4.jpeg";
import ChatBox from "../components/ChatBox";
import gif from "../assets/Deep Breathing Animation.gif";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[900px] mt-10">
        <img src={bg} alt="Background" className="w-full h-auto" />
        <div className="absolute top-1/3 -translate-y-1/2 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-black font-serif font-bold text-3xl md:text-4xl">
            Unlock the Power of Telemedicine Wisdom
          </h1>
          <h1 className="text-black font-bold text-lg md:text-xl">
            Your Personalized Ayurvedic Healthcare Companion
          </h1>
          <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 mt-4">
            <Link to="/search-disease">
              <button className="bg-richblack-800 text-white py-2 px-4 rounded border border-richblack-700">
                Browse Herbs
              </button>
            </Link>
            <Link to="/get-checkup-done">
              <button className="bg-richblack-800 text-white py-2 px-4 rounded border border-richblack-700">
                Get Your Checkup Done
              </button>
            </Link>
            {currentUser && (
              <Link
                to="https://sfu.mirotalk.com/join/70797BrownGhost"
                target="_blank"
              >
                <button className="bg-richblack-800 text-white py-2 px-4 rounded border border-richblack-700">
                  Create Meeting
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* The rest of your component content */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-20 w-full max-w-[1080px] mx-auto px-4">
        <div className="space-y-2">
          <h1 className="font-mullish font-bold text-3xl md:text-4xl leading-tight text-black">
            Get Started Today
          </h1>
          <p className="font-mullish text-lg md:text-xl leading-7 text-black opacity-70">
            "Arogya" is dedicated to revolutionizing healthcare accessibility
            for remote and underserved communities through innovative
            telemedicine solutions...
          </p>
        </div>
        <img
          src={gif}
          alt="Deep Breathing Animation"
          className="w-full max-w-[550px] rounded-full mt-4 lg:mt-0"
        />
      </div>

      <section className="relative bg-gray-300 w-full mt-10">
        <div className="w-10/12 max-w-[1080px] mx-auto flex flex-col items-center py-16">
          <p className="font-mullish font-semibold text-2xl leading-tight text-black text-center">
            "Ayurveda is not just about treating diseases; it is about creating
            harmony in body, mind, and spirit." - Dr Vasant Lad
          </p>
        </div>
      </section>

      {/* Additional sections */}
      <h1 className="font-mullish font-bold text-3xl md:text-4xl leading-tight text-black m-4">
        Chat Bot
      </h1>
      <ChatBox />
    </div>
  );
};

export default Home;
