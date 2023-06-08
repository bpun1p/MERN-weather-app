const User = require('../models/userModel');

const loginUser = async (req, res) => {
  res.send({msg: 'login user'})
}

const registerUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.register(email, password)
    res.status(200).json({email, user})
  } 
  catch(err) {
    res.status(400).json({error: err.message})
  }
}

module.exports = {
  loginUser,
  registerUser
}