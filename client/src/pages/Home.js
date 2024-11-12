import React from "react";
import bg from "../assets/WhatsApp Image 2023-09-17 at 3.12.02 PM.jpeg";
import leftimg from "../assets/High Five transition for the latest project.gif";
import rightimg from "../assets/back-left-4.jpeg";
import ChatBox from "../components/ChatBox";
import gif from "../assets/Deep Breathing Animation.gif";
import { Link } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
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
            <Link
              to="https://sfu.mirotalk.com/join/70797BrownGhost"
              target="_blank"
            >
              <button className="bg-richblack-800 text-white py-2 px-4 rounded border border-richblack-700">
                Create Meeting
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center py-14 w-full max-w-[1080px] mx-auto px-4">
        <div className="space-y-2">
          <h1 className="font-mullish font-bold text-3xl md:text-4xl leading-tight text-black">
            Get Started Today
          </h1>
          <p className="font-mullish text-lg md:text-xl leading-7 text-black opacity-70">
            "Arogya" is dedicated to revolutionizing healthcare accessibility
            for remote and underserved communities through innovative
            telemedicine solutions...
          </p>
          <p className="font-mullish text-lg md:text-xl leading-7 text-black opacity-70">
            Are you tired of navigating through numerous Ayurvedic texts and
            sifting through complex terminology? With our software, you can
            leave the cumbersome research to us...
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

      <div className="flex flex-col lg:flex-row justify-between items-center py-20 w-full max-w-[1080px] mx-auto px-4">
        <img
          src={rightimg}
          alt="Right Image"
          className="w-full max-w-[580px] rounded-full"
        />
        <div className="space-y-2 ml-4">
          <h1 className="font-mullish font-bold text-3xl md:text-4xl leading-tight text-black">
            How It Works?
          </h1>
          <p className="font-mullish text-lg md:text-xl leading-7 text-black opacity-70">
            Our Ayurvedic Formulation Recommendation Software is a sophisticated
            blend of ancient wisdom and state-of-the-art technology...
          </p>
        </div>
      </div>

      <div className="relative bg-green-800 w-full">
        <div className="w-10/12 max-w-[1080px] flex flex-col lg:flex-row justify-between items-center mx-auto py-16 text-white">
          <p className="text-center text-sm">
            <span className="text-[55px] font-bold">80%+</span> <br /> reduction
            in average <br /> time to first response
          </p>
          <p className="text-center text-sm">
            <span className="text-[55px] font-bold">1,002%</span> <br />{" "}
            increase in total social <br /> engagements
          </p>
          <p className="text-center text-sm">
            <span className="text-[55px] font-bold">2X</span> <br /> increase in
            average <br /> client retainer
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center py-20 w-full max-w-[1080px] mx-auto px-4">
        <div className="space-y-2">
          <h1 className="font-mullish font-bold text-3xl md:text-4xl leading-tight text-black">
            Why Choose Us
          </h1>
          <p className="font-mullish text-lg md:text-xl leading-7 text-black opacity-70">
            Our software understands that no two individuals are the same...
          </p>
        </div>
        <img
          src={leftimg}
          alt="Left Image"
          className="w-full max-w-[450px] rounded-full"
        />
      </div>

      <section className="relative bg-gray-300 w-full mt-6">
        <div className="w-10/12 max-w-[1080px] mx-auto flex flex-col items-center py-16">
          <p className="font-mullish font-semibold text-2xl leading-tight text-black text-center">
            "Ayurveda is not just about treating diseases; it is about creating
            harmony in body, mind, and spirit." - Dr Vasant Lad
          </p>
        </div>
      </section>
      <h1 className="font-mullish font-bold text-3xl md:text-4xl leading-tight text-black m-4">
        Chat Bot
      </h1>
      <ChatBox />
    </div>
  );
};

export default Home;
