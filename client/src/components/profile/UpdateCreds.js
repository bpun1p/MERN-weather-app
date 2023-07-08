import React, { useState } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './UpdateCreds.css';
import { UpdateCredentials } from '../utils/access/updateCredentials';

export default function UpdateCreds() {
  const { user } = useAuthContext();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    confirmPass: null
  });
  const [toggleCredOpts, setToggleCredOpts] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(null);
  const { update, isUpdating, updateError } = UpdateCredentials();

  const toggleCredOptions = (e) => {
    e.preventDefault()
    setToggleCredOpts(toggleCredOpts => !toggleCredOpts);
  };

  const handleSubmitUpdatedCreds = async (e) => {
    e.preventDefault()
    if (!credentials.password || !credentials.confirmPass) {
      return setError(error => error = 'Please fill all fieilds before submitting');
    }
    if (credentials.password !== credentials.confirmPass) {
      return setError(error => error = 'Passwords do not match');
    }
    await update(credentials.email, credentials.password, user);

    if (!updateError) {
      return setError(error => error = updateError);
    }

    setIsUpdated(isUpdated => isUpdated = true);
  }

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
                type='text'
                id='email'
                placeholder={user.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className='password-container'>
                <p>Password:</p>
                <input 
                type='password'
                id='password'
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <div className='confirm-container'>
                <p>Confirm Password:</p>
                <input 
                type='password'
                id='confirm-password'
                onChange={(e) => setCredentials({...credentials, confirmPass: e.target.value})}
                />
              </div>
            </div>
            {updateError && <div className='error'>{updateError}</div>}
            {error && <><br/><div className='error'>{error}</div></>}
            <br/>
            <button id='updateCreds' disabled={isUpdating} onClick={handleSubmitUpdatedCreds} type='submit' className='submit-updatecreds-btn'>Save</button>
            <div/>
          </> 
        : null}
      </form>
      {isUpdated ? <span className='update-success-text'>Updated!</span>: null}

    </div>
  );
};