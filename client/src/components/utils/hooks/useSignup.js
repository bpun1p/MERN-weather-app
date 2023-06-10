import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { userSignup } from '../../../service/userService';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    const response = await userSignup(email, password);
    if (response.status !== 200) {
        console.log(response.response.data.error);
        setLoading(false);
        setError(response.response.data.error);    
    };
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({type: 'LOGIN', payload: data});
      setLoading(false);
    };
  };
  return { signup, loading, error }
};