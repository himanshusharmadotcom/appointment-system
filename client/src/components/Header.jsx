import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <header className="flex justify-between flex-col md:flex-row gap-4 md:gap-0 items-center p-4 bg-blue-500 text-white">
            <div className="text-lg font-bold">
                <NavLink to="/">AppointmentSystem</NavLink>
            </div>
            <nav>
                {token ? (
                    <>
                        <NavLink
                            to="/profile"
                            className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600 mr-2"
                        >
                            Profile
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-yellow-500 rounded text-white hover:bg-yellow-600"
                        >
                            Logout
                        </button>
                    </>
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
