import React, { useState } from 'react';
import './AccessModal.css';
import { useSignup } from '../utils/hooks/useSignup';

export default function AccessModal() {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null
  })
  const {signup, error, loading} = useSignup()

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(credentials.email, credentials.password);
    if (!error) {
      setCredentials({...credentials, 
        email: null,
        password: null
      })
    }
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
  }
  
  
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
      <button disabled={loading} id='login' onClick={handleLogin} type='submit' className='login-btn'>Login</button>
      <button  disabled={loading} id='register' onClick={handleSignup} type='submit' className='signup-btn'>Sign Up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}