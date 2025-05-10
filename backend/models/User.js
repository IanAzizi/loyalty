const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // here we use the phone number as password (no hashing yet)
  },
  role: {
    type: String,
    default: 'customer', // Default role for new users is "customer"
    enum: ['customer', 'manager'], // Only these two roles are allowed
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
