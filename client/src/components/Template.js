import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";
import img from "../assets/Tooploox website jobs illustration.gif";

const Template = ({ title, desc1, formtype, setIsLoggedIn }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center gap-y-12 md:gap-x-12 w-full max-w-[1160px] p-6">
        {/* Left Section (Form) */}
        {/* Left Section (Form) */}
        <div className="w-full max-w-[450px] text-center md:text-left">
          {formtype === "signup" ? (
            <SignupForm setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>

        {/* Right Section (Image) */}
        {formtype !== "signup" && (
          <div className="mt-6 w-full max-w-[450px]">
            <img
              src={img}
              alt="Page Illustration"
              loading="lazy"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
