import { useState } from 'react';
import { updateUser } from '../../../service/authService';
import { useAuthContext } from './useAuthContext';

export const UpdateCredentials = () => {
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const update = async (email, password, updatedUser) => {
    setIsUpdating(true);
    setUpdateError(null);
    const response = await updateUser(email, password, updatedUser);

    if (response.status !== 200) {
      setIsUpdating(false);
      setUpdateError(response.response.data.error);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user});   
    };
    if (response.status === 200) {
      const data = response.data
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setIsUpdating(false);
    }
  };

  return { update, isUpdating, updateError };
};