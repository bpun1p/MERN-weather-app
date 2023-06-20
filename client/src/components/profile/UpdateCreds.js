import React, { useState } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './UpdateCreds.css';

export default function UpdateCreds() {
  const { user } = useAuthContext();
  const [newCreds, setNewCreds] = useState({
    email: null,
    password: null,
    confirmPass: null
  });
  const [toggleCredOpts, setToggleCredOpts] = useState(false);

  const toggleCredOptions = (e) => {
    e.preventDefault()
    setToggleCredOpts(toggleCredOpts => !toggleCredOpts);
  };

  const handleSubmitNewCreds = (e) => {
    e.preventDefault()
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
              onChange={(e) => setNewCreds({...newCreds, username: e.target.value})}
              />
            </div>
            <div>
              <p>Password:</p>
              <input 
              type='password'
              id='password'
              onChange={(e) => setNewCreds({...newCreds, password: e.target.value})}
              />
            </div>
            <div>
              <p>Confirm Password:</p>
              <input 
              type='password'
              id='confirm-password'
              onChange={(e) => setNewCreds({...newCreds, confirmPass: e.target.value})}
              />
            </div>
            <button id='updateCreds' onClick={handleSubmitNewCreds} type='submit' className='submit-updatecreds-btn'>Submit</button>
            <div/>
          </> 
          : null}
        </form>
      </div>
  )
}