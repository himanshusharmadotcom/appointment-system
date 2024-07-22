import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }
    
        const res = await axios.get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      const res = await axios.put('http://localhost:3000/api/users/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile?');
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }
  
        await axios.delete('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        localStorage.removeItem('token');
        navigate('/login');
      } catch (err) {
        console.error('Error deleting profile:', err.response ? err.response.data : err.message);
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mt-12 md:mt-0">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Role"
            disabled
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mb-4">Update</button>
        <button type="button" onClick={handleDelete} className="w-full p-2 bg-red-500 text-white rounded">Delete</button>
      </form>
    </div>
  );
};

export default Profile;
