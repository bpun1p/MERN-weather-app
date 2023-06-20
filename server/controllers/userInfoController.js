const UserInfo = require('../models/userInfoModel');

const saveUserInfo = async (req, res) => {
  try {
    const user_id = req.user._id

    const userInfo = new UserInfo({
      name: req.body.name,
      image: req.body.image,
      user_id: user_id
    });
    
    const saved = await userInfo.save();
    res.status(200).json({ msg : `saved user information: ${saved}` });
  }
  catch(err) {
    res.status(400).json({ msg: err });
  };
};

const getUserInfo = async (req, res) => {
  try {
    const user_id = req.user._id

    const userInfo = await UserInfo.find({ user_id });

    if (userInfo.length === 0) {
      throw Error ('No user info saved')
    }

    res.status(200).send({userInfo});
  } 
  catch(err) {
    res.status(400).json({ error: err.message });
  };
};

module.exports = {
  saveUserInfo,
  getUserInfo
}