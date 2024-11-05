import React from 'react';
import leftimg from '../assets/back-left2.jpg';
import rightimg from '../assets/back-left-4.jpeg';
import backleft from '../assets/Inner Peace Meditation GIF.gif';
import gif from '../assets/Intercom Live Chat.gif';
import gif2 from '../assets/Searching.gif';

import { RiSlideshow4Line } from 'react-icons/ri';
import { BiShareAlt, BiAddToQueue } from 'react-icons/bi';
import { FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { IoAddSharp, IoLogoRss } from 'react-icons/io5';
import { MdManageSearch } from 'react-icons/md';
import { FaDiscord } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';

const About = () => {
  return (
    <div className="bg-gray-200 w-full mt-4">
      {/* Section Header */}
      <section className="relative flex flex-col items-center text-center py-8">
        <div className="w-10/12 max-w-[1080px]">
          <p className="text-[24px] md:text-[30px] font-bold text-black">ABOUT US</p>
        </div>
      </section>

      {/* Why Arogya Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-8 space-y-8 lg:space-y-0">
        <div className="lg:w-1/2 px-4 lg:px-14 space-y-4">
          <h1 className="font-bold text-[28px] md:text-[36px] text-black">Why Arogya</h1>
          <p className="text-[16px] md:text-[18px] text-black opacity-70">
            Arogya is revolutionizing healthcare access through telemedicine technology. Our platform offers convenient virtual consultations, eliminating geographical barriers and reducing the costs associated with traditional healthcare visits. With a focus on quality care, privacy, and security, Arogya connects users with experienced healthcare providers who deliver personalized medical advice and treatment recommendations. Our innovative approach empowers individuals to take control of their health journey while making a positive impact on underserved communities. Join us in creating a healthier, more connected world with TeleMediConnect.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end px-4 lg:px-14">
          <img src={gif} alt="Why Arogya" className="w-full max-w-[580px]" />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-8 space-y-8 lg:space-y-0">
        <div className="lg:w-1/2 flex justify-center lg:justify-start px-4 lg:px-14">
          <img src={gif2} alt="Our Mission" className="w-full max-w-[580px] rounded-full" />
        </div>
        <div className="lg:w-1/2 px-4 lg:px-14 space-y-4">
          <h1 className="font-bold text-[28px] md:text-[36px] text-black">Our Mission</h1>
          <p className="text-[16px] md:text-[18px] text-black opacity-70">
            At Arogya, we're committed to democratizing healthcare by making quality medical services accessible to all. Through innovative telemedicine solutions, we bridge gaps in healthcare delivery, especially in underserved areas. Our goal is to empower individuals to take control of their health journey and receive timely consultations from experienced professionals, ensuring a healthier, more equitable world for everyone.
          </p>
        </div>
      </div>

      {/* Technology and Tradition Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-8 space-y-8 lg:space-y-0">
        <div className="lg:w-1/2 px-4 lg:px-14 space-y-4">
          <h1 className="font-bold text-[28px] md:text-[36px] text-black">The Power of Technology and Tradition</h1>
          <p className="text-[16px] md:text-[18px] text-black opacity-70">
            At Arogya, we recognize the strength that comes from blending the latest in technology with time-honored traditions in healthcare. By harnessing the power of telemedicine, we honor the wisdom of traditional healthcare practices while leveraging modern innovations to enhance accessibility and quality of care. Our approach seamlessly integrates the benefits of both worlds, ensuring that individuals receive the best possible medical attention while respecting their cultural heritage and values.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end px-4 lg:px-14">
          <img src={backleft} alt="The Power of Technology and Tradition" className="w-full max-w-[450px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
