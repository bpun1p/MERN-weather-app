import React, { useState } from 'react';
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

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(credentials.email, credentials.password);

    if (signupError) {
      return setError(error => error = signupError)
    }

    props.loggedInClicked()

  };
  
  const handleLogin = async(e) => {
    e.preventDefault();

    await login(credentials.email, credentials.password);

    if (loginError) {
      return setError(error => error = loginError)
    }

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
      {error && <div className='error'>{error}</div>}
      <button disabled={loadingLogin || loadingSignup} id='login' onClick={handleLogin} type='submit' className='login-btn'>Login</button>
      <button  disabled={loadingSignup || loadingLogin} id='register' onClick={handleSignup} type='submit' className='signup-btn'>Sign Up</button>
    </form>
  );
};