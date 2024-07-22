import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data being sent:", formData);
      const res = await axios.post('http://localhost:3000/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Response data:", res.data);
      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem('token', token);
  
        const decodedToken = jwtDecode(token);
  
        // console.log(decodedToken);
  
        const userRole = decodedToken.user.role; 
  
        console.log("User role:", userRole);
  
        localStorage.setItem('role', userRole);
  
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Error response:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <span className='mb-2'>Don't have an account <NavLink to='/register' className='border-b border-gray-500'>register</NavLink> here.</span>
      </form>
    </div>
  );
};

export default Login;
