import axios from 'axios';
const currentUrl = 'http://localhost:3000';

export const userSignup = async (email, password) => {
  try {
    const res = await axios.post(`${currentUrl}/user/register`, {
      email: email,
      password: password
    });
    return res;
  }
  catch(err) {
    return err;
  };
};

export const userLogin = async (email, password) => {
  try {
    const res = await axios.post(`${currentUrl}/user/login`, {
      email: email,
      password: password
    });
    return res;
  }
  catch(err) {
    return err;
  };
};

export const saveUserInfo = async (name, imageFile, user) => {
  try {
    const res = await axios.post(`${currentUrl}/userInfo/save`, { 
      name: name,
      imageFile: imageFile,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
    })
    return res;
  }
  catch(err) {
    return err;
  }
}

export const getUserInfo = async (user) => {
  try {
    const res = await axios.get(`${currentUrl}/userInfo/get`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return res.data;
  } 
  catch (err) {
    return err
  };
};