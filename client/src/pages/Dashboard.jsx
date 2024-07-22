import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  // console.log(role);

  if (!role) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    if (role === 'Student') {
      fetchTeachers();
    } else if (role === 'Teacher') {
      fetchAppointments();
    }
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log(token);
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      const res = await axios.get('http://localhost:3000/api/users/teachers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTeachers(res.data);
    } catch (err) {
      console.error('Error fetching teachers:', err.response ? err.response.data : err.message);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log(token);
      if (!token) {
        console.error('No token found');
        return;
      }
      const res = await axios.get('http://localhost:3000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err.response ? err.response.data : err.message);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      const res = await axios.post('http://localhost:3000/api/appointments', {
        teacherId: selectedTeacher,
        date,
        time,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Appointment booked:', res.data);
      setSelectedTeacher('');
      setDate('');
      setTime('');
    } catch (err) {
      console.error('Error booking appointment:', err.response ? err.response.data : err.message);
    }
  };

  const handleConfirmAppointment = async (appointmentId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      const res = await axios.put(`http://localhost:3000/api/appointments/confirm/${appointmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Appointment status updated:', res.data);

      // Update the state to reflect the new status
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, confirmed: res.data.confirmed } : appointment
        )
      );
    } catch (err) {
      console.error('Error updating appointment status:', err.response ? err.response.data : err.message);
    }
  };

  // console.log(appointments);

  return (
    <div className="p-6">
      {role === 'Student' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
          <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleBookAppointment}>
            <div className="mb-4">
              <label className="block mb-1">Teacher</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Time</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Book</button>
          </form>
        </div>
      )}

      {role === 'Teacher' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Confirm Appointments</h2>
          {appointments.length === 0 ? (
            <p>No students have applied for an appointment yet.</p>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment._id} className="mb-4 p-4 bg-white rounded shadow">
                  <p>Student: {appointment.studentId.name}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <button
                    className={`mt-2 px-4 py-2 text-white rounded ${appointment.confirmed ? 'bg-red-500' : 'bg-green-500'}`}
                    onClick={() => handleConfirmAppointment(appointment._id, appointment.confirmed)}
                  >
                    {appointment.confirmed ? 'Confirmed' : 'Confirm'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
