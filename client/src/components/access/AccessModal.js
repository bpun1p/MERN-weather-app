import React, { useState, useEffect } from 'react';
import './AccessModal.css';
import { Signup } from '../utils/access/signup';
import { Login } from '../utils/access/login';
import PropTypes from 'prop-types';

export default function AccessModal({loggedInClicked}) {
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

    if (signupError) {
      setError(() => signupError);
      return;
    }

  }, [signupError, loginError]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return setError(() => 'Fill in all fields required');
    }
    await signup(credentials.email, credentials.password);

    loggedInClicked();
  };
  
  const handleLogin = async(e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return setError(() => 'Fill in all fields required');
    }
    await login(credentials.email, credentials.password);

    loggedInClicked();
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
    </form>
  );
}

AccessModal.propTypes = {
  loggedInClicked: PropTypes.func
};