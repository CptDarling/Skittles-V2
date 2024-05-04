// authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Verify token
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateToken;