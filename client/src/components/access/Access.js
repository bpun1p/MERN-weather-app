import React, { useState, useEffect } from 'react';
import AccessModal from './AccessModal';
import './Access.css';
import { Logout } from '../utils/access/logout';
import { useAuthContext } from '../utils/access/useAuthContext';
import PropTypes from 'prop-types';

export default function Access({show, loggedInClicked, loggedOutClicked, modalClicked }) {
  const [toggleModal, setToggleModal] = useState(false);
  const { user } = useAuthContext();
  const { logout } = Logout();
  const guestEmail = process.env.REACT_APP_GUEST_EMAIL;

  useEffect(() => {
    setToggleModal(() => show);
  }, [show]);

  const toggleAccessModal = () => {
    modalClicked();
    setToggleModal(toggleModal => !toggleModal);
  };

  const handleLogout = () => {
    loggedOutClicked();
    logout();
    setToggleModal(toggleAccessModal => !toggleAccessModal);
  };

  const handleDisplayUser = () => {
    if (user.email === guestEmail){
      return 'Guest';
    }
    return user.email;
  };

  return (
    <div className='access'>
      {user ?
        <>
          <p className='access_email'>{handleDisplayUser()}</p>
          <button className='logout-btn' onClick={handleLogout}>Log out</button>
        </>
        :
        <>
          <button className='access-btn' onClick={toggleAccessModal}>Access</button>
          {toggleModal ? <AccessModal loggedInClicked={loggedInClicked}/> : null}
        </>
      }
    </div> 
  );
}

Access.propTypes = {
  show: PropTypes.bool,
  loggedInClicked: PropTypes.func,
  loggedOutClicked: PropTypes.func,
  modalClicked: PropTypes.func
};