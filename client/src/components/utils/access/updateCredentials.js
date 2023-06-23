import { useState } from 'react';
import { updateUser } from '../../../service/authService';

export const UpdateCredentials = async () => {
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  const update = async (email, password) => {
    setIsUpdating(true);
    setUpdateError(null);
    const response = await updateUser(email, password);

    if (response.status !== 200) {
        console.log(response.response.data.error);
        setIsUpdating(false);
        setUpdateError(response.response.data.error);    
    };

    const data = response.data;
    localStorage.setItem('user', JSON.stringify(data));
    setIsUpdating(false);
  };

  return { update, isUpdating, updateError };
};