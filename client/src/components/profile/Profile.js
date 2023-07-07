import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './Profile.css';
import UpdateCreds from './UpdateCreds';
import { saveUserInfo, getUserInfo, updateUserInfo } from '../../service/userInfoServices';
import { convertToBase64 } from '../utils/convertToBase64/convertToBase64';
import avatar from '../assets/images/avatar.png';

export default function Profile() {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState({
    name: null,
    imageFile: null,
  });
  const [nameChangeOptToggler, setNameChangeOptToggler] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [unauthError, setUnauthError] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfo(user);
      if (res) {
        if (res.response && res.response.status !== 200) {
          return;
        };
        if (res.userInfo) { 
          if (res.userInfo[0].name) {
            setUserInfo(userInfo => ({...userInfo, name: res.userInfo[0].name}))
          };
          if (res.userInfo[0].imageFile) {
            setUserInfo(userInfo =>({...userInfo, imageFile: res.userInfo[0].imageFile}))
          };
          setIsFetched(true);
        };
      };
    };

    if (!isFetched) {
      fetchUserInfo();
    };
    return(() => {
      setUserInfo({...userInfo, name: null, imageFile: null})
      setIsFetched(false);
    })
  }, [user]);

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();

    if (!user) {
      return setUnauthError(unauthError => unauthError = 'Login or sign up to create your own profile')
    }

    const saved =  await saveUserInfo(userInfo.name, userInfo.imageFile, user);
    
    if (saved) {
      setIsSaved(true);
    }
  };
  
  const toggleNameChangeOpt = (e) => {
    e.preventDefault();
    setNameChangeOptToggler(nameChangeOptToggler => !nameChangeOptToggler);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUserInfo({...userInfo, imageFile: base64});
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();

    const update = await updateUserInfo(userInfo.name, userInfo.imageFile, user);

    if (update) {
      setIsSaved('Updated!');
      setNameChangeOptToggler(false);    
    }
  };

  return (
    <>
      <div className='profile-container'>
        <form className='user-info'>
          <div className='user-avatar'>
            <label htmlFor="file-upload" className='custom-file-upload'>
              <img src={userInfo.imageFile || avatar} alt="" />
            </label>
            <input type="file" id='file-upload' accept="image/*" className='file-upload' onChange={(e) => handleFileUpload(e)}/>
          </div>
          <div className='name-container'>
            <p className='name-heading'>Name:</p>
            {nameChangeOptToggler ?               
              <input className='name-input name' type="text" id="name" placeholder={userInfo.name} onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/> 
              : 
              <p className='name-text name' >{userInfo.name || null}</p>
            }
            {userInfo.name ?
              <button className='name-change-btn' onClick={toggleNameChangeOpt}>Change Name</button>
              :
              <input type="text" id="name" onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/>
            }
          </div>
          <br/>
          {user && isFetched ? 
            <button id='updateUserInfo' onClick={handleUpdateUserInfo} type='submit' className='submit-userinfo-btn'>Update</button>
          :
            <div className='tooltip' style={{height : '0', padding : '0'}}>
              <span style={{left : '50%', top : '10px'}} className='tooltipText'>Login or sign up to create your profile</span> 
              <button id='saveUserInfo' onClick={handleSubmitUserInfo} type='submit' className='submit-userinfo-btn'>Save</button>
            </div>
          }
        </form>
          {isSaved ? <p className='saved-results-msg'>Saved!</p> : null}
          {!user && unauthError ? <span className='unauthorized-save-userinfo'>{unauthError}</span> : null}
        <br/>
        {user ?
          <div className='update-creds-container'>
            <UpdateCreds/>
          </div> 
        : null}
      </div>
  </>
  );
};