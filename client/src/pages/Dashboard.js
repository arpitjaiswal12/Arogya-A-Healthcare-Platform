import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/Slices/userSlice.js'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);

    const handleLogout = () => {
        // Clear cookies
        Cookies.remove('token');
        Cookies.remove('user');
        dispatch(logout()); // Dispatch logout action
        toast.success("Logged Out");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className='max-w-[800px] mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>User Profile</h1>
            {userInfo ? (
                <div>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    {/* Add other user information as needed */}
                    <button onClick={handleLogout} className='bg-red-600 text-white py-2 px-4 rounded-md mt-4'>
                        Log Out
                    </button>
                </div>
            ) : (
                <p>No user information available. Please log in.</p>
            )}
        </div>
    );
};

export default Profile;
