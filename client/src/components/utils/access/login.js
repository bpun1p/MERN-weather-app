import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { userLogin } from '../../../service/authService';

export const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoadingLogin(() => true);
    const response = await userLogin(email, password);
    setLoadingLogin(loadingLogin => !loadingLogin);
    if (response.status !== 200) {
      setLoginError(() => response.response.data.error);
      return;
    }
    else if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      return;
    }
  };
  return { login, loadingLogin, loginError };
};