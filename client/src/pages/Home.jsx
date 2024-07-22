import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Appointment System</h1>
      <div className="flex space-x-4">
        <NavLink to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</NavLink>
        <NavLink to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</NavLink>
      </div>
    </div>
  );
};

export default Home;
