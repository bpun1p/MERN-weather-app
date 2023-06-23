import { useState } from 'react';
import { updateUser } from '../../../service/authService';

export const UpdateCredentials = () => {
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  const update = async (email, password, user) => {
    setIsUpdating(true);
    setUpdateError(null);
    const response = await updateUser(email, password, user);

    if (response.status !== 200) {
      console.log(response);
      setIsUpdating(false);
      setUpdateError(response);    
    };
    
    const data = response.data
    localStorage.setItem('user', JSON.stringify(data));
    setIsUpdating(false);
  };

  return { update, isUpdating, updateError };
};