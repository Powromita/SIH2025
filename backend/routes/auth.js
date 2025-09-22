const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User with this email already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET || 'your_secret_key_here', { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, role: newUser.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your_secret_key_here', { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

module.exports = router;