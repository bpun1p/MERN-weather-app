import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './Profile.css';
import UpdateCreds from './UpdateCreds';
import { saveUserInfo, getUserInfo, updateUserInfo } from '../../service/userInfoServices';
import { convertToBase64 } from '../utils/convertToBase64/convertToBase64';
import avatar from '../assets/images/avatar.png';
import PropTypes from 'prop-types';

export default function Profile({ logOut, buttonClicked }) {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState({
    name: null,
    imageFile: null,
  });
  const [nameChangeOptToggler, setNameChangeOptToggler] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [unauthError, setUnauthError] = useState(null);
  const [isCredsChanged, setIsCredsChanged] = useState(null);

  const fetchUserInfo = async () => {
    const res = await getUserInfo(user);
    if (res) {
      if (res.response && res.response.status !== 200) {
        return;
      }
      if (res.userInfo && res.userInfo.length > 0) { 
        if (res.userInfo[0].name) {
          setUserInfo(userInfo => ({...userInfo, name: res.userInfo[0].name}));
        }
        if (res.userInfo[0].imageFile) {
          setUserInfo(userInfo =>({...userInfo, imageFile: res.userInfo[0].imageFile}));
        }
        setIsFetched(() => true);
      }
      return;
    }
  };

  useEffect(() => {
    fetchUserInfo();
    return(() => {
      setIsFetched(() => false);
      setIsCredsChanged(() => false);
    });
  }, [user, isCredsChanged]);

  useEffect(() =>{
    if (logOut === true) {
      setUserInfo(userInfo => ({...userInfo, name: null, imageFile: null}));
      setIsSaved(() => false);
    }
  }, [logOut]);

  const handleUserCredsChanged = () => {
    setIsCredsChanged(() => true);
  };

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();

    if (!user) {
      buttonClicked();
      setUnauthError(() => 'Login or sign up to create your own profile');
      return;
    }

    await saveUserInfo(userInfo.name, userInfo.imageFile, user);
    setIsSaved(() => true);
  };
  
  const toggleNameChangeOpt = (e) => {
    e.preventDefault();
    setNameChangeOptToggler(nameChangeOptToggler => !nameChangeOptToggler);
  };

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64File = await convertToBase64(file);
      setUserInfo(userInfo => ({...userInfo, imageFile: base64File}));
    }
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();

    await updateUserInfo(userInfo.name, userInfo.imageFile, user);
    setIsSaved(() => true);
    setNameChangeOptToggler(() => false);
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
            {userInfo && nameChangeOptToggler ?
              <input className='name-input name' type="text" id="name" placeholder={userInfo.name} onChange={(e) => setUserInfo(userInfo => ({...userInfo, name: e.target.value}))}/> 
              : 
              <p className='name-text name' >{userInfo.name || null}</p>
            }
            {userInfo ?
              <button className='name-change-btn' onClick={toggleNameChangeOpt}>Change Name</button>
              :
              <input type="text" id="name" onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/>
            }
          </div>
          <br/>
          {user && isFetched ? 
            <button id='updateUserInfo' onClick={handleUpdateUserInfo} type='submit' className='submit-userinfo-btn'>Update</button>
            :
            <>
              {!user ? 
                <div className='tooltip' style={{height : '0', padding : '0'}}>
                  <span style={{left : '50%', top : '10px'}} className='tooltipText'>Login or sign up to create your profile</span> 
                  <button id='saveUserInfo' onClick={handleSubmitUserInfo} type='submit' className='submit-userinfo-btn'>Save</button>
                </div>
                :
                <button id='saveUserInfo' onClick={handleSubmitUserInfo} type='submit' className='submit-userinfo-btn'>Save</button>
              }
            </>
          }
        </form>
        {isSaved ? <p className='saved-results-msg'>Saved!</p> : null}
        {!user && unauthError ? <span className='unauthorized-save-userinfo'>{unauthError}</span> : null}
        <br/>
        {user ?
          <div className='update-creds-container'>
            <UpdateCreds updatesPerformed={handleUserCredsChanged} />
          </div> 
          : null}
      </div>
    </>
  );
}

Profile.propTypes = {
  buttonClicked: PropTypes.func,
  logOut: PropTypes.bool
};