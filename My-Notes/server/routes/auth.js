const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Not all fields have been entered.' });
    if (password.length < 5) return res.status(400).json({ message: 'The password needs to be at least 5 characters long.' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'An account with this username already exists.' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: passwordHash });
    const savedUser = await newUser.save();
    
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET || 'secret123');
    res.json({ token, user: { id: savedUser._id, username: savedUser.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Not all fields have been entered.' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'No account with this username has been registered.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
