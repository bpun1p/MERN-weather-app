const loginUser = async (req, res) => {
  res.send({msg: 'login user'})
}

const registerUser = async (req, res) => {
  res.send({msg: 'register user'})
}

module.exports = {
  loginUser,
  registerUser
}