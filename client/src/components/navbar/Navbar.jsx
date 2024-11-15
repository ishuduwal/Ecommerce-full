import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);  // State to track if the user is admin
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Retrieve user info from local storage
        const storedUser = window.localStorage.getItem("userInfo");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.username) {
                    setUsername(parsedUser.username);
                }
                if (parsedUser && parsedUser.isAdmin) {
                    setIsAdmin(parsedUser.isAdmin);  // Set isAdmin from the localStorage user info
                }
            } catch (e) {
                console.error("Failed to parse user from localStorage:", e);
            }
        }
    }, []);

    const handleProfileClick = () => {
        // Navigate to either admin-dashboard or user-dashboard based on isAdmin flag
        if (isAdmin) {
            navigate('/admin-dashboard');
        } else {
            navigate('/user-dashboard');  // Assuming you have a user-dashboard route
        }
    };

    return (
        <>
            <div className='flex justify-between items-center px-20 h-16 w-full bg-purple-main-69 text-white fixed max-sm:px-8'>
                <div className='text-xl font-normal'>
                    <Link to='/'><i className="fa-solid fa-notes-medical text-2xl pr-2"></i>PlantAura</Link>
                </div>
                <ul className='flex gap-12 max-md:hidden'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/product'>Plants</Link></li>
                    <li>
                        {username ? (
                            <div>
                                <div onClick={handleProfileClick}>
                                    <i className="fa-solid fa-image-portrait"></i>
                                    {username && <span className='username-highlight'>{username}</span>}
                                </div>
                            </div>
                        ) : (
                            <Link to='/login' className='link'>
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        )}
                    </li>
                </ul>
                <div className='hidden max-md:flex'>
                    <button onClick={toggleMenu}>
                        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className='bg-purple-main-69 text-white fixed top-16 left-0 w-full p-4'>
                    <ul className='flex flex-col gap-4 text-center items-center'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/product'>Plants</Link></li>
                        <li>
                            {username ? (
                                <div>
                                    <div onClick={handleProfileClick}>
                                        <i className="fa-solid fa-image-portrait"></i>
                                        {username && <span className='username-highlight'>{username}</span>}
                                    </div>
                                </div>
                            ) : (
                                <Link to='/login' className='link'>
                                    <i className="fa-solid fa-user"></i>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};
