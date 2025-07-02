const User = require('../models/User');
const Circular = require('../models/Circular');
const Event = require('../models/Event');

// Get user counts
const getUserCounts = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const faculties = await User.countDocuments({ role: 'faculty' });
    const admins = await User.countDocuments({ role: 'admin' });
    res.json({ totalUsers, students, faculties, admins });
  } catch (err) {
    console.error('User count error:', err);
    res.status(500).json({ message: 'Error getting user counts' });
  }
};

// Get circular count
const getCircularCount = async (req, res) => {
  try {
    const count = await Circular.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Circular count error:', err);
    res.status(500).json({ message: 'Error getting circular count' });
  }
};

// Get event count
const getEventCount = async (req, res) => {
  try {
    const count = await Event.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Event count error:', err);
    res.status(500).json({ message: 'Error getting event count' });
  }
};

// Test route
const testRoute = (req, res) => {
  res.send('Admin route is working.');
};

module.exports = {
  getUserCounts,
  getCircularCount,
  getEventCount,
  testRoute,
};
