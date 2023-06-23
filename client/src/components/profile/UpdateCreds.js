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
  const { update, isUpdating, updateError } = UpdateCredentials();

  const toggleCredOptions = (e) => {
    e.preventDefault()
    setToggleCredOpts(toggleCredOpts => !toggleCredOpts);
  };

  const handleSubmitUpdatedCreds = async (e) => {
    e.preventDefault()
    try {

      if (credentials.password !== credentials.confirmPass) {
        throw Error('Passwords do not match')
      }

      await update(credentials.email, credentials.password);
    }
    catch(err) {
      setError(err);
    }
  };

  return (
    <div>
      <form>
        <button onClick={toggleCredOptions}>Update Email/Password</button>
        {toggleCredOpts ?
          <> 
            <div>
              <p>Email:</p>
              <input 
              type='text'
              id='email'
              placeholder={user.email}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div>
              <p>Password:</p>
              <input 
              type='password'
              id='password'
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            <div>
              <p>Confirm Password:</p>
              <input 
              type='password'
              id='confirm-password'
              onChange={(e) => setCredentials({...credentials, confirmPass: e.target.value})}
              />
              {error && <div className='error'>{error}</div>}
              {updateError && <div className='error'>{updateError}</div>}
            </div>
            <br/>
            <button id='updateCreds' disabled={isUpdating} onClick={handleSubmitUpdatedCreds} type='submit' className='submit-updatecreds-btn'>Submit</button>
            <div/>
          </> 
        : null}
      </form>
    </div>
  );
};