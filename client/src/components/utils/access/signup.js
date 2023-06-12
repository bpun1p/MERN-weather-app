import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { userSignup } from '../../../service/userService';

export const Signup = () => {
  const [signupError, setSignupError] = useState(null);
  const [loadingSignup, setLoadingSignup] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoadingSignup(true);
    setSignupError(null);
    const response = await userSignup(email, password);

    if (response.status !== 200) {
        console.log(response.response.data.error);
        setLoadingSignup(false);
        setSignupError(response.response.data.error);    
    };

    const data = response.data;
    localStorage.setItem('user', JSON.stringify(data));
    dispatch({ type: 'LOGIN', payload: data });
    setLoadingSignup(false);
  };

  return { signup, loadingSignup, signupError };
};