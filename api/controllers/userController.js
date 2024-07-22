import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      console.log(req.user.id)
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      await User.findByIdAndDelete(req.user.id);
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'Teacher' }).select('-password');
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
