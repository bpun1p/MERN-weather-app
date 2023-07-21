import React, { useState, useEffect } from 'react';
import AccessModal from './AccessModal';
import './Access.css';
import { Logout } from '../utils/access/logout';
import { useAuthContext } from '../utils/access/useAuthContext';
import PropTypes from 'prop-types';

export default function Access({show, loggedInClicked, loggedOutClicked, modalClicked}) {
  const [toggleModal, setToggleModal] = useState(false);
  const { user } = useAuthContext();
  const { logout } = Logout();

  useEffect(() => {
    setToggleModal(() => show)
  }, [show])

  const toggleAccessModal = () => {
    modalClicked()
    setToggleModal(toggleModal => !toggleModal);
  };

  const handleLogout = () => {
    loggedOutClicked();
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
          {toggleModal ? <AccessModal loggedInClicked={loggedInClicked}/> : null}
        </>
      }
    </div> 
  );
}

Access.propTypes = {
  show: PropTypes.func,
  loggedInClicked: PropTypes.func,
  loggedOutClicked: PropTypes.func,
  modalClicked: PropTypes.func
};