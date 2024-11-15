import React, { useState } from 'react';
import signupplant from '../../assets/signupplant.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../function/User';

export const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        mobilenumber: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        let errors = {};
        let isValid = true;

        if (!user.username || user.username.length < 6) {
            isValid = false;
            errors['username'] = 'Username must be at least 6 characters long';
        }

        if (!user.email) {
            isValid = false;
            errors['email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            isValid = false;
            errors['email'] = 'Email is invalid';
        }

        if (!user.password || user.password.length < 6) {
            isValid = false;
            errors['password'] = 'Password must be at least 6 characters long';
        }

        if (!user.mobilenumber) {
            isValid = false;
            errors['mobilenumber'] = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(user.mobilenumber)) {
            isValid = false;
            errors['mobilenumber'] = 'Mobile number must be exactly 10 digits';
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await Register(user);
                console.log('Response from Register:', response);
                if (response) {
                    console.log('Account created successfully');
                    window.localStorage.setItem('email', response.user.email);
                    window.localStorage.setItem('username', response.user.username);
                    window.localStorage.setItem('isAdmin', JSON.stringify(response.user.isAdmin));
                    window.localStorage.setItem('userInfo', JSON.stringify(response.user));
                    navigate('/');
                    window.location.reload();
                }
            } catch (error) {
                console.log('Account creation failed:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 pt-16">
            <div className="bg-white p-4  w-96 h-[33rem] shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Sign up 🔑</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your name</label>
                        <div className="flex space-x-2">
                            <input type="text" name='firstname' placeholder="First name" value={user.firstname} onChange={handleInputChange} className="border border-gray-300  px-3 py-2 w-1/2" />
                            <input type="text" name='lastname' placeholder="Last name" value={user.lastname} onChange={handleInputChange} className="border border-gray-300  px-3 py-2 w-1/2" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input type="email" name='email' placeholder="tylerdurden@gmail.com" value={user.email} onChange={handleInputChange} className="border border-gray-300  px-3 py-2 w-full" />
                    </div>
                    {errors.email && <div className='error'>{errors.email}</div>}
                    <div className="mb-4">
                        <label className="block mb-2">Username</label>
                        <input type="email" name='username' placeholder="tylerdurden@gmail.com" value={user.username} onChange={handleInputChange} className="border border-gray-300  px-3 py-2 w-full" />
                    </div>
                    {errors.username && <div className='error'>{errors.username}</div>}
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input type="password" name='password' placeholder="Min, 6 characters" value={user.password} onChange={handleInputChange} className="border border-gray-300  px-3 py-2 w-full" />
                    </div>
                    {errors.password && <div className='error'>{errors.password}</div>}
                    <div className="mb-4">
                        <label className="block mb-2">Mobile Number</label>
                        <input type="text" name='mobilenumber' placeholder="9800000000" value={user.mobilenumber} onChange={handleInputChange} className="border border-gray-300  px-3 py-2 w-full" />
                    </div>
                    {errors.mobilenumber && <div className='error'>{errors.mobilenumber}</div>}
                    <button className="bg-purple-main-69 text-white py-2 px-4  w-full" onClick={handleSubmit}>Sign up</button>
                    <p className='text-center m-2'>Or</p>
                </form>
                <p className="text-center mt-4">Already have an account? <Link to='/login' className="text-purple-950 underline">Login now</Link></p>
            </div>
            <div className="hidden shadow-lg md:block">
                <img src={signupplant} className='w-96 h-[33rem] object-cover' alt="Signup" />
            </div>
        </div>
    );
};
