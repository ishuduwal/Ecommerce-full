import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import plant from '../../assets/plant.png';
import { Login } from '../function/User';

export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in with:', user);
            const res = await Login(user);
            console.log('Response from Login:', res);

            if (res && res._id) {
                localStorage.setItem('email', res.email);
                localStorage.setItem('username', res.username);
                localStorage.setItem('isAdmin', JSON.stringify(res.isAdmin));
                localStorage.setItem('userInfo', JSON.stringify(res));

                setUser({
                    email: '',
                    password: ''
                });

                setError('');

                navigate('/');
                window.location.reload();
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Invalid email or password');
            console.log('Login failed:', error);
        }
    };

    return (
        <div className='h-screen w-full flex justify-center items-center bg-gray-200 pt-16'>
            <div className='bg-purple-main-69 h-[30rem] w-96 flex justify-center items-center max-md:hidden'>
                <img src={plant} alt="Login Illustration" className='h-[20rem] w-[20rem] object-cover' />
            </div>
            <div className='bg-white h-[30rem] w-96 px-4 py-8 max-md:m-8'>
                <h1 className='text-2xl font-bold'>Sign in</h1>
                <p className='mt-2'>Welcome back! Please enter your details.</p>

                <div className='mt-6'>
                    <label className="block">Email</label>
                    <input type='email' placeholder="tylerdurden@gmail.com" name='email' className='w-full p-2 mb-2 border border-black' value={user.email} onChange={handleChange} />
                </div>
                <div className='mt-4'>
                    <label className="block">Password</label>
                    <div className='flex items-center'>
                        <input name='password' type={showPassword ? "text" : "password"} placeholder="Min, 6 characters" className='w-full p-2 border-t border-l border-b border-black' value={user.password} onChange={handleChange} required />
                        <div className='cursor-pointer p-3 border-black border-r border-t border-b flex justify-center items-center' onClick={handlePassword}>
                            {showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}
                        </div>
                    </div>
                </div>
                {error && <div className='error'>{error}</div>}
                <div className='mt-2'>
                    <button className='w-full p-2 bg-purple-main-69 text-white hover:bg-purple-900' onClick={LoginHandler}>Sign in</button>
                </div>
                <p className='text-center m-2'>Or</p>
                <div className='mt-4 text-center'>
                    <p>Need an account? <Link to='/signup' className='underline'>Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};
