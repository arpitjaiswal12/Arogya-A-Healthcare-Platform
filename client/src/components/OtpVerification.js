import { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Handle expired reCAPTCHA
          },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const formattedPhone = "+" + phone;

    signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtpInput(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        window.recaptchaVerifier = null;
      });
  }

  function onOtpVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Invalid OTP, please try again.");
      });
  }

  return (
    <div className="w-11/12 max-w-[1080px] mx-auto mt-8">
      <section className="bg-white border-[3px] rounded-md shadow-md p-6">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-black font-bold text-2xl">
            👍 Login Successful
          </h2>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-md p-4">
            <h1 className="text-center text-2xl font-bold text-black mb-6">
              Welcome to CODE A PROGRAM
            </h1>
            {showOtpInput ? (
              <>
                <div className="bg-black text-white w-fit mx-auto p-4 rounded-full mb-4">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label className="font-semibold text-lg text-gray-700 text-center mb-2">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container border-[3px] rounded-md p-2 text-center text-lg"
                />
                <button
                  onClick={onOtpVerify}
                  className="w-full bg-black rounded-md font-medium text-white px-4 py-2 mt-6 hover:bg-gray-800 transition duration-200"
                >
                  {loading && (
                    <CgSpinner size={20} className="animate-spin inline mr-2" />
                  )}
                  Verify OTP
                </button>
              </>
            ) : (
              <>
                <div className="bg-black text-white w-fit mx-auto p-4 rounded-full mb-4">
                  <BsTelephoneFill size={30} />
                </div>
                <label className="font-semibold text-lg text-gray-700 text-center mb-2">
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={phone} onChange={setPhone} />
                <button
                  onClick={onSignup}
                  className="w-full bg-black rounded-md font-medium text-white px-4 py-2 mt-6 hover:bg-gray-800 transition duration-200"
                >
                  {loading && (
                    <CgSpinner size={20} className="animate-spin inline mr-2" />
                  )}
                  Send code via SMS
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default OtpVerification;
