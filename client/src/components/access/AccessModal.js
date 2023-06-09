import React from 'react';
import './AccessModal.css';

export default function AccessModal() {
  
  return(
    <form className='access-modal'>
      <input type="text" id="email" placeholder='Email'/><br/>
      <input type="text" id="password" placeholder='Password'/><br/>
      <input type="submit" value="Login" className='login-btn'/>
      <input type="submit" value="Sign Up" className='signup-btn'/>
    </form>
  )
}