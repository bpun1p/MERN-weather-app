import React, { useState, useEffect } from 'react';
import './AccessModal.css';
import { Signup } from '../utils/access/signup';
import { Login } from '../utils/access/login';

export default function AccessModal(props) {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null
  });
  const {signup, signupError, loadingSignup} = Signup();
  const {login, loginError, loadingLogin} = Login();
  const [error, setError] = useState(null)

  useEffect(() => {
    if (loginError) {
      setError(error => error = loginError)
      return
    }

    if (signupError) {
      setError(error => error = signupError)
      return
    }
  }, [signupError, loginError])

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(credentials.email, credentials.password);

    props.loggedInClicked()

  };
  
  const handleLogin = async(e) => {
    e.preventDefault();

    await login(credentials.email, credentials.password);

    props.loggedInClicked()
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
};