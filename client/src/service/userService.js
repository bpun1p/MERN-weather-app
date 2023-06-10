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