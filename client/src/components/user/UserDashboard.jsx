import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Cart } from './Cart';

export const UserDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('welcome');
    const [username, setUsername] = useState('');
    const handleLogout = () => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("isAdmin");
        window.localStorage.removeItem("userInfo");
        window.localStorage.removeItem("cart");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("username");
        Navigate('/');
        window.location.reload();
    };
    useEffect(() => {
        const storedUser = window.localStorage.getItem("userInfo");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.username) {
                    setUsername(parsedUser.username);
                }
            } catch (e) {
                console.error("Failed to parse user from localStorage:", e);
            }
        }
    }, []);

    return (
        <div className='flex w-full pt-16 max-lg:flex-col'>
            <div className='w-60 bg-gray-300 text-black shadow-lg p-5 fixed h-screen max-lg:static max-lg:w-full max-lg:h-20 max-lg:flex max-lg:justify-between max-lg:px-8'>
                <h2 className='text-2xl font-bold mb-10'>User Dashboard</h2>
                <ul className='space-y-4 max-lg:flex max-lg:space-y-0 max-lg:gap-4'>
                    <li className={`cursor-pointer max-lg:h-2rem max-lg:w-20 p-2 ${selectedSection === 'cart' ? 'bg-purple-700 text-white' : 'bg-white hover:bg-purple-500 hover:text-white'}`} onClick={() => setSelectedSection('cart')}>Cart</li>
                    <li className={`cursor-pointer bg-white max-lg:h-2rem max-lg:w-28 p-2`} onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className='w-full h-screen bg-gray-100 p-10 pl-72 max-lg:pl-0 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:p-0'>
                {selectedSection === 'welcome' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-5">Welcome to the {username} Dashboard</h2>
                    </div>
                )}
                {selectedSection === 'cart' && <Cart />}
            </div>
        </div>
    );
};
