import React, { useState } from 'react';
import './Profile.css';
import { useAuthContext } from '../utils/access/useAuthContext';

export default function Profile() {
  const { user } = useAuthContext();
  const [toggleCredOpts, setToggleCredOpts] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: null,
    username: null,
    image: null,
    birthdate: null
  });
  const maxDate = new Date().toISOString().split("T")[0];
  const [newCreds, setNewCreds] = useState({
    email: null,
    password: null,
    confirmPass: null
  })

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
  };
  
  const credentialUpdate = (e) => {
    e.preventDefault();
  }

  const toggleCredOptions = (e) => {
    e.preventDefault()
    setToggleCredOpts(!toggleCredOpts);
  }
  
  const handleSubmitNewCreds = (e) => {
    e.preventDefault()
  }

  return (
    <>
    {user ?
    <div className='profile-container'>
      <h1 className='profile-heading'>{user.email}</h1> 
      <form className='user-info'>
        <div>
          <input type="file" 
          accept="image/*" 
          onChange={(e) => setUserInfo({...userInfo, image: URL.createObjectURL(e.target.files[0])})} />
          {userInfo.image ? <img alt='user profile' src={userInfo.image}/> : null}
        </div>
        <div>
          <p>Full Name:</p>
          <input 
            type="text" 
            id="fullname"
            onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
          />
        </div>
        <div>
          <p>Username:</p>
          <input 
          type='text'
          id='username'
          onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
          />
        </div>
        <div>
          <p>Birthdate:</p>
          <input 
          type="date" 
          id="start" 
          name="birthdate"
          max={`${maxDate}`}
          onChange={(e) => setUserInfo({...userInfo, birthdate: e.target.value})}
          />
        </div>
        <br/>
        <button id='updateUserInfo' onClick={handleSubmitUserInfo} type='submit' className='submit-userinfo-btn'>Save</button>
      </form>
      <br/>
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
    : null}
  </>
  );
};