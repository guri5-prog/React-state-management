const express = require('express');
const { verifyToken, requireRole } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Protected route for any authenticated user
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.username}!` });
});

// Admin only route
router.get('/admin/users', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
