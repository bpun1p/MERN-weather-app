import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { userSignup } from '../../../service/authService';

export const Signup = () => {
  const [signupError, setSignupError] = useState(null);
  const [loadingSignup, setLoadingSignup] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoadingSignup(() => true);
    const response = await userSignup(email, password);
    setLoadingSignup(loadingSignup => !loadingSignup);
    if (response.status !== 200) {
      setSignupError(() => response.response.data.error);
      return;
    }
    else if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      return;
    }
  };
  return { signup, loadingSignup, signupError };
};