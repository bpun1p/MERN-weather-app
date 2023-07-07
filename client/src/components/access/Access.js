import React, { useState, useEffect } from 'react';
import AccessModal from './AccessModal';
import './Access.css';
import { Logout } from '../utils/access/logout';
import { useAuthContext } from '../utils/access/useAuthContext';

export default function Access(props) {
  const [toggleModal, setToggleModal] = useState(false);
  const { user } = useAuthContext();
  const { logout } = Logout();

  useEffect(() => {
    setToggleModal(toggleModal => toggleModal = props.show)
  }, [props.show])

  const toggleAccessModal = () => {
    props.modalClicked()
    setToggleModal(toggleModal => !toggleModal);
  };

  const handleLogout = () => {
    props.loggedOutClicked();
    logout();
    setToggleModal(toggleAccessModal => !toggleAccessModal);
  };

  return (
    <div className='access'>
      {user ? <p className='access_email'>{user.email}</p> : null}
      {user ?
        <button className='logout-btn' onClick={handleLogout}>Log out</button>
        :
        <>
          <button className='access-btn' onClick={toggleAccessModal}>Login / Sign Up</button>
          {toggleModal ? <AccessModal loggedInClicked={props.loggedInClicked}/> : null}
        </>
      }
    </div> 
  );
};