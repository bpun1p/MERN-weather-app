const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d'})
}

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({email, token});
  } 
  catch(err) {
    res.status(400).json({error: err.message});
  }
}

const registerUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.register(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } 
  catch(err) {
    res.status(400).json({error: err.message})
  }
} 

const updateUser = async (req, res) => {
  const user_id = req.user._id;
  const updates = req.body;

  const infoToUpdate = await User.find({ user_id });
  try {

  } 
  catch(err) {

  }
}

module.exports = {
  loginUser,
  registerUser,
  updateUser
}