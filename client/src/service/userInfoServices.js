import axios from 'axios';
const currentUrl = 'http://localhost:3000';

export const saveUserInfo = async (name, imageFile, user) => {
  try {
    const res = await axios.post(`${currentUrl}/userInfo/save`, { 
      name: name,
      imageFile: imageFile,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
    });
    return res;
  }
  catch(err) {
    return err;
  }
};

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
    return err;
  }
};

export const updateUserInfo = async(name, imageFile, user) => {
  try {
    const res = await axios.patch(`${currentUrl}/userInfo/update`, { 
      name: name,
      imageFile: imageFile,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        withCredentials: true,
      },
    });
    return res.data.reponse.msg;
  }
  catch(err) {
    return (err.response.data.error);
  }
};