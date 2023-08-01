import axios from 'axios';
const currentUrl = 'https://bpun1p-weather-app-api.onrender.com';

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
  }
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
  }
};

export const updateUser = async (email, password, user) => {
  try {
    const res = await axios.patch(`${currentUrl}/user/update`, {
      email : email,
      password: password
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