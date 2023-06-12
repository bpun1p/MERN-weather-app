import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('context is outside the AuthContextProvider');
  }

  return context;
}