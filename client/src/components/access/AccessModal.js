import React, { useState } from 'react';
import './AccessModal.css';
import { Signup } from '../utils/access/signup';
import { Login } from '../utils/access/login';

export default function AccessModal() {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null
  });
  const {signup, signUpError, loadingSignup} = Signup();
  const {login, loginError, loadingLogin} = Login();

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(credentials.email, credentials.password);
  };
  
  const handleLogin = async(e) => {
    e.preventDefault();

    await login(credentials.email, credentials.password);
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
      <button disabled={loadingLogin || loadingSignup} id='login' onClick={handleLogin} type='submit' className='login-btn'>Login</button>
      <button  disabled={loadingSignup || loadingLogin} id='register' onClick={handleSignup} type='submit' className='signup-btn'>Sign Up</button>
      {loginError && <div className='error'>{loginError}</div>}
      {signUpError && <div className='error'>{signUpError}</div>}
    </form>
  )
}