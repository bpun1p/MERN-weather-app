import React, { useState } from 'react';
import AccessModal from './AccessModal';
import './Access.css';
import { Logout } from '../utils/access/logout';
import { useAuthContext } from '../utils/access/useAuthContext';

export default function Access() {
  const [toggleModal, setToggleModal] = useState(false);
  const { user } = useAuthContext();
  const { logout } = Logout();


  const toggleAccessModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleLogout = () => {
    logout();
    setToggleModal(!toggleAccessModal);
  };

  return (
    <div className='access'>
      {user ?   
        <button onClick={handleLogout}>Log out</button>
        :
        <>
          <button onClick={toggleAccessModal}>Login / Sign Up</button>
          {toggleModal ? <AccessModal/> : null}
        </>
      }
    </div> 
  );
};