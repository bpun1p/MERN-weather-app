import React, { useState, useEffect } from 'react';
import './AccessModal.css';
import { Signup } from '../utils/access/signup';
import { Login } from '../utils/access/login';
import PropTypes from 'prop-types';

export default function AccessModal({loggedInClicked}) {
  const guestEmail = process.env.REACT_APP_GUEST_EMAIL;
  const guestPassword = process.env.REACT_APP_GUEST_PASSWORD;
  const [credentials, setCredentials] = useState({
    email: null,
    password: null
  });
  const {signup, signupError, loadingSignup} = Signup();
  const {login, loginError, loadingLogin} = Login();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loginError) {
      setError(() => loginError);
      return;
    }
    else if (signupError) {
      setError(() => signupError);
      return;
    }
  }, [signupError, loginError]);

  const handleSignup = async (e) => {
    e.preventDefault();

    loggedInClicked();
    if (!credentials.email || !credentials.password) {
      setError(() => 'All fields must be filled');
      return;
    }
    await signup(credentials.email, credentials.password);
  };
  
  const handleLogin = async(e) => {
    e.preventDefault();

    loggedInClicked();
    if (!credentials.email || !credentials.password) {
      setError(() => 'All fields must be filled');
      return;
    }
    await login(credentials.email, credentials.password);
  };

  const handleGuestLogin = async(e) => {
    e.preventDefault();

    loggedInClicked();
    await login(guestEmail, guestPassword);
  };
  
  return(
    <form className='access-modal'>
      <input 
        type="text" 
        id="email"
        placeholder='Email' 
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
      /><br/>
      <input 
        type="password" 
        id="password" 
        placeholder='Password' 
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
      /><br/>
      {error ? <div className='error'>{error}</div> : null}
      <button disabled={loadingLogin || loadingSignup} id='login' onClick={handleLogin} type='submit' className='login-btn'>Login</button>
      <button  disabled={loadingSignup || loadingLogin} id='register' onClick={handleSignup} type='submit' className='signup-btn'>Sign Up</button>
      <button  disabled={loadingSignup || loadingLogin} id='register' onClick={handleGuestLogin} type='submit' className='login-btn'>Guest Access</button>
    </form>
  );
}

AccessModal.propTypes = {
  loggedInClicked: PropTypes.func
};