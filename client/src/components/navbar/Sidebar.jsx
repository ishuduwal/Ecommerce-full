import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = ({ isSidebar, setIsSidebar }) => {
    const sidebarRef = useRef(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const adminStatus = window.localStorage.getItem("isAdmin") === "true";
        setIsAdmin(adminStatus);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebar(false);
            }
        };
        if (isSidebar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebar, setIsSidebar]);



    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
    };


    const LogoutHandler = () => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("isAdmin")
        window.localStorage.removeItem("userInfo");
        window.localStorage.removeItem("cart")
        navigate('/');
        window.location.reload();
    }
    return (
        <>
            <div className='sidebar bg-slate-300' ref={sidebarRef}>
                {isAdmin && (
                    <div>
                        <Link to='/admin-dashboard'><button>Dashboard</button></Link>
                    </div>
                )}
                <div>
                    <Link to='/cart'><button className='cart-product'>Cart</button></Link>
                </div>
                <div>
                    <button className='logout' onClick={LogoutHandler}>Logout</button>
                </div>
            </div>
        </>
    )
}
