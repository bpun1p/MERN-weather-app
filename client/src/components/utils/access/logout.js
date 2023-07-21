import { useAuthContext } from "./useAuthContext";

export const Logout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};