import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './UpdateCreds.css';
import { UpdateCredentials } from '../utils/access/updateCredentials';
import PropTypes from 'prop-types';

export default function UpdateCreds({ updatesPerformed }) {
  const { user } = useAuthContext();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    confirmPass: null
  });
  const [toggleCredOpts, setToggleCredOpts] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(null);
  const { update, loadingUpdate, updateError, updateSuccess } = UpdateCredentials();
  const guestEmail = process.env.REACT_APP_GUEST_EMAIL;

  useEffect(() => {
    if (updateError) {
      setError(() => updateError);
      return;
    }

    else if (updateSuccess) {
      setIsUpdated(() => true);
      updatesPerformed();
      return;
    }
  }, [updateError, updateSuccess]);

  const toggleCredOptions = (e) => {
    e.preventDefault();
    setToggleCredOpts(toggleCredOpts => !toggleCredOpts);
  };

  const handleSubmitUpdatedCreds = async (e) => {
    e.preventDefault();
    if (user.email === guestEmail) {
      setError(() => 'Unauthorized to make changes to guest account');
      return;
    }
    else if (!credentials.password || !credentials.confirmPass) {
      setError(() => 'Please fill in all fields before submitting');
      return;
    }
    else if (credentials.password !== credentials.confirmPass) {
      setError(() => 'Passwords do not match');
      return;
    }
    await update(credentials.email, credentials.password, user);
    return;
  };

  return (
    <div>
      <button className='update-modal-btn' onClick={toggleCredOptions}>Change Email / Password</button>
      <form>
        {toggleCredOpts ?
          <>
            <div className='form-body'>
              <div className='email-container'>
                <p>Email:</p>
                <input 
                  data-testid='email'
                  type='text'
                  id='email'
                  placeholder={user.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className='password-container'>
                <p>Password:</p>
                <input 
                  data-testid='password'
                  type='password'
                  id='password'
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <div className='confirm-container'>
                <p>Confirm Password:</p>
                <input 
                  data-testid='confirm_password'
                  type='password'
                  id='confirm-password'
                  onChange={(e) => setCredentials({...credentials, confirmPass: e.target.value})}
                />
              </div>
            </div>
            {error && <><br/><div className='error'>{error}</div></>}
            <br/>
            <button id='updateCreds' disabled={loadingUpdate} onClick={handleSubmitUpdatedCreds} type='submit' className='submit-updatecreds-btn'>Save</button>
            <div/>
          </> 
          : null}
      </form>
      {isUpdated ? <span className='update-success-text'>Updated!</span>: null}
    </div>
  );
}

UpdateCreds.propTypes = {
  updatesPerformed: PropTypes.func
};