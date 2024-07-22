import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res) => {
  const { teacherId, date, time } = req.body;
  try {
    const newAppointment = new Appointment({
      studentId: req.user.id,
      teacherId,
      date,
      time,
    });

    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getAppointments = async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'Teacher') {
      appointments = await Appointment.find({ teacherId: req.user.id }).populate('studentId', 'name');
    } else if (req.user.role === 'Student') {
      appointments = await Appointment.find({ studentId: req.user.id }).populate('teacherId', 'name');
    }
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const confirmAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }

    appointment.confirmed = !appointment.confirmed;
    await appointment.save();

    res.send(appointment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

