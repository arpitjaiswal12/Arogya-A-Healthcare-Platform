import React from 'react';
import gif from '../assets/This Moment Is Your Life — Libby VanderPloeg.gif';

const Contact = () => {
  return (
    <div className="w-11/12 max-w-[1080px] mx-auto mt-8">
      <section className="bg-gray-200 w-full py-8 px-4 rounded-md">
        <h2 className="text-center text-2xl font-bold text-black mb-6">Contact Us</h2>
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Left Section with Image */}
          <img
            src={gif}
            alt="Decorative gif"
            className="w-full max-w-[400px] lg:w-[45%] rounded-md mb-6 lg:mb-0 lg:mr-8"
          />

          {/* Right Section with Form */}
          <form className="w-full lg:w-[50%] bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Join Our Community</h3>
            <p className="text-gray-600 text-sm mb-6">
              We invite you to join our community. Whether you’re experienced in Ayurveda or just starting out, let’s connect!
            </p>
            
            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <input
                type="tel"
                placeholder="Phone (optional)"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Message"
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
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
