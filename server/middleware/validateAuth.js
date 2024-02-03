const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Require authorization token' });
  }

  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    
    if (!payload) {
      throw new Error('Invalid token');
    }

    const user = await User.findOne({ _id: payload._id }).select('_id');
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token validation error:', err.message);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};



module.exports = validateAuth;