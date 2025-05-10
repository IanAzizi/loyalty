const jwt = require('jsonwebtoken');

const verifyManager = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    if (decoded.role !== 'manager') {
      return res.status(403).json({ message: 'Access denied, manager only' });
    }

    req.user = decoded;
    next();  // Continue to the next middleware/route
  });
};

module.exports = { verifyManager };
