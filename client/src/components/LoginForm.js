import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/userSlice.js'; // Adjust the path as necessary

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize the dispatch function

    const [formData, setFormData] = useState({
        email: "", password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8002/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Set the token and user data in cookies
                Cookies.set('token', data.token, { expires: 1 });
                Cookies.set('user', JSON.stringify(data.user), { expires: 1 });

                // Dispatch the user data to the Redux store
                dispatch(setUser(data.user));

                toast.success("Logged In");
                navigate("/dashboard");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed. Please try again.");
        }
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            <label className='w-full'>
                <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    name="email"
                    className='bg-white border-[5px] rounded-[0.5rem] text-black w-full p-[12px]'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>
                    Password<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    name="password"
                    className='bg-white border-[5px] rounded-[0.5rem] text-black w-full p-[12px]'
                />

                <span
                    className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? 
                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : 
                        (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                </span>

                <Link to="#">
                    <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className='bg-black rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6'>
                Sign In
            </button>
        </form>
    );
}

export default LoginForm;
