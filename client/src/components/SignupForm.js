import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("Patient");

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const accountData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            contactNumber: formData.contactNumber,
            password: formData.password,
            accountType
        };

        try {
            const response = await fetch("http://localhost:8002/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(accountData)
            });

            

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            toast.success("Account Created Successfully");
            // setIsLoggedIn(true); // Assuming you set the user logged in state here
            navigate("/login"); // Redirect to login page
        } catch (error) {
            toast.error(error.message || "An error occurred during signup");
        }
    }

    return (
        <div>
            {/* Patient-Doctor tab */}
            <div className='flex bg-white border-[5px] p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button
                    className={`${accountType === "Patient" 
                        ? "bg-richblack-900 text-white"
                        : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("Patient")}>
                    Patient
                </button>
                <button
                    className={`${accountType === "Doctor" 
                        ? "bg-richblack-900 text-white"
                        : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("Doctor")}>
                    Doctor
                </button>
            </div>

            <form onSubmit={submitHandler}>
                {/* first name and lastName */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                        />
                    </label>
                </div>

                {/* email Add */}
                <div className='mt-[20px]'>
                    <label className='w-full mt-[20px]'>
                        <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Enter Email Address "
                            value={formData.email}
                            className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                        />
                    </label>
                </div>

                {/* Contact Number */}
                <div className='mt-[20px]'>
                    <label className='w-full mt-[20px]'>
                        <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Contact Number<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="tel"
                            name="contactNumber"
                            onChange={changeHandler}
                            placeholder="Enter Contact Number"
                            value={formData.contactNumber}
                            className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                        />
                    </label>
                </div>

                {/* createPassword and Confirm Password */}
                <div className='w-full flex gap-x-4 mt-[20px]'>
                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type={showPassword ? ("text") : ("password")}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            value={formData.password}
                            className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? 
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : 
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                        </span>
                    </label>

                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? ("text") : ("password")}
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            className='bg-white border-[3px] rounded-[0.5rem] text-black w-full p-[12px]'
                        />
                        <span 
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowConfirmPassword(prev => !prev)}>
                            {showConfirmPassword ? 
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : 
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                        </span>
                    </label>
                </div>
                
                <button className='w-full bg-black rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6'>
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm;
