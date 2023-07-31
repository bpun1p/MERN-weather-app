import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { userLogin } from '../../../service/authService';

export const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoadingLogin(true);
    setLoginError(null);
    const response = await userLogin(email, password);

    if (response.status !== 200) {
      setLoadingLogin(false);
      setLoginError(response.response.data.error);
    }
    
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setLoadingLogin(false);
    }
  };

  return { login, loadingLogin, loginError };
};