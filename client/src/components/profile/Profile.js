import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './Profile.css';
import UpdateCreds from './UpdateCreds';
import { saveUserInfo, getUserInfo } from '../../service/userService';
import { convertToBase64 } from '../utils/convertToBase64/convertToBase64';
import avatar from '../assets/images/avatar.png';

export default function Profile() {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState({
    name: null,
    imageFile: null,
  });
  const [fetchedName, setFetchedName] = useState(null);
  const [fetchedImage, setFetchedImage] = useState(null);
  const [nameChangeOptToggler, setNameChangeOptToggler] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfo(user);
      if (res) {
        if (res.response && res.response.status !== 200) {
          console.log(res.response.data.error);
          return;
        };
        if (res.userInfo) { 
          if (res.userInfo[0].name) {
            setUserInfo(userInfo => ({...userInfo, name: res.userInfo[0].name}))
          };
          if (res.userInfo[0].imageFile) {
            setUserInfo(userInfo =>({...userInfo, imageFile: res.userInfo[0].imageFile}))
          };
        };
      };
    };

    if (!userInfo.name || !userInfo.imageFile) {
      fetchUserInfo();
    };
  }, [user]);

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    saveUserInfo(userInfo.name, userInfo.imageFile, user);
  };
  
  const toggleNameChangeOpt = (e) => {
    e.preventDefault();
    setNameChangeOptToggler(nameChangeOptToggler => !nameChangeOptToggler);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUserInfo({...userInfo, imageFile: base64});
  }

  return (
    <>
      {user ?
        <div className='profile-container'>
          <h1 className='profile-heading'>{user.email}</h1> 
          <form className='user-info'>
            <div>
              <label htmlFor="file-upload" className='custom-file-upload'>
                <img src={userInfo.imageFile || avatar} alt="" />
              </label>
              <input type="file" id='file-upload' accept="image/*" className='file-upload' onChange={(e) => handleFileUpload(e)}/>
            </div>
            <div>
              <p>Name:</p>
              {nameChangeOptToggler ?               
                <input type="text" id="name" placeholder={userInfo.name} onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/> 
                : 
                <p>{userInfo.name || null}</p>
              }
              {userInfo ? 
                <button onClick={toggleNameChangeOpt}>Change Name</button>
                :
                <input type="text" id="name" onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/>
              }
            </div>
            <br/>
            <button id='updateUserInfo' onClick={handleSubmitUserInfo} type='submit' className='submit-userinfo-btn'>Save</button>
          </form>
          <br/>
          <UpdateCreds/>
        </div>
      : null}
  </>
  );
};