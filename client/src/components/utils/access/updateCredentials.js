import { useState } from 'react';
import { updateUser } from '../../../service/authService';
import { useAuthContext } from './useAuthContext';

export const UpdateCredentials = () => {
  const [updateError, setUpdateError] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const update = async (email, password, updatedUser) => {
    setLoadingUpdate(() => true);
    const response = await updateUser(email, password, updatedUser);
    setLoadingUpdate(loadingUpdate => loadingUpdate);

    if (response.status !== 200) {
      setUpdateError(() => response.response.data.error);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user});
      setUpdateSuccess(() => false);
      return;   
    }
    else if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setUpdateSuccess(() => true);
      return;
    }
  };
  return { update, updateSuccess, loadingUpdate, updateError };
};