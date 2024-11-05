import React from 'react';
import gif from '../assets/This Moment Is Your Life — Libby VanderPloeg.gif';

const Contact = () => {
  return (
    <div className="w-11/12 max-w-[1080px] mx-auto mt-8">
      <section className="bg-white border-[3px] rounded-md shadow-md p-6">
        <h2 className="text-center text-2xl font-bold text-black mb-6">Contact Us</h2>
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Left Section with Image */}
          <img
            src={gif}
            alt="Decorative gif"
            className="w-full max-w-[400px] lg:w-[45%] rounded-md mb-6 lg:mb-0 lg:mr-8"
          />

          {/* Right Section with Form */}
          <form className="w-full lg:w-[50%] flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Join Our Community</h3>
            <p className="text-gray-600 text-sm mb-6">
              We invite you to join our community. Whether you’re experienced in Ayurveda or just starting out, let’s connect!
            </p>
            
            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-x-4">
                <label className='w-full'>
                  <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Name<sup className='text-pink-200'>*</sup></p>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                    required
                  />
                </label>

                <label className='w-full'>
                  <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Email<sup className='text-pink-200'>*</sup></p>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                    required
                  />
                </label>
              </div>

              <label className='w-full'>
                <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Phone (optional)</p>
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                />
              </label>

              <label className='w-full'>
                <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Message<sup className='text-pink-200'>*</sup></p>
                <textarea
                  placeholder="Type Your Message"
                  rows="4"
                  className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                  required
                ></textarea>
              </label>

              <button
                type="submit"
                className='w-full bg-black rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 hover:bg-gray-800 transition duration-200'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
