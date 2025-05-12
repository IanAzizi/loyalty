const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// SIGN UP
exports.signup = async (req, res) => {
  const { name, phone, role = 'customer' } = req.body; // Default to 'customer' if role isn't provided
  
  try {
    // Check if user exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'کاربر قبلا ساخته شده است' });
    }
    
    // Create new user
    const newUser = new User({
      name,
      phone,
      password: phone, // we're using phone as password
      role,  // Use the role provided (either 'customer' or 'manager')
    });

    // Save user to DB
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: '365d' } // Token expires in 1 year
    );

    // Respond with user info and token
    res.status(201).json({ userId: newUser._id, token, role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: 'ارور سرور', error: err });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { phone } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'کاربر پیدا نشد' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '365d' } // Token expires in 1 year
    );

    // Respond with token
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'ارور سرور', error: err });
  }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'کاربر پیدا نشد' });
    }

    // Respond with user info
    res.json({
      userId: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'ارور سرور', error: err });
  }
};
