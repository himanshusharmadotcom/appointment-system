import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="flex justify-between flex-col md:flex-row gap-4 md:gap-0 items-center p-4 bg-blue-500 text-white">
            <div className="text-lg font-bold">
                AppointmentSystem
            </div>
            <nav>
                {token ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600 mr-2"
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="px-4 py-2 bg-yellow-500 rounded text-white hover:bg-yellow-600"
                        >
                            Sign Up
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
