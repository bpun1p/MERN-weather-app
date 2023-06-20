import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/access/useAuthContext';
import './Profile.css';
import UpdateCreds from './UpdateCreds';
import { saveUserInfo, getUserInfo } from '../../service/userService';

export default function Profile() {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState({
    name: null,
    image: null,
  });
  const [fetchedName, setFetchedName] = useState(null);
  const [fetchedImage, setFetchedImage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfo(user);
      if (res) {
        if (res.response && res.response.status !== 200) {
          console.log(res.response.data.error);
          return;
        }
        if (res.userInfo) { 
          if (res.userInfo[0].name) {
            setFetchedName(res.userInfo[0].name)
          }
          if (res.userInfo[0].image) {
            setFetchedImage(res.userInfo[0].image)
          }
        }
      }
    };

    fetchUserInfo();
  }, [user])

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    saveUserInfo(userInfo.name, userInfo.image, user);
  };


  return (
    <>
    {user ?
    <div className='profile-container'>
      <h1 className='profile-heading'>{user.email}</h1> 
      <form className='user-info'>
        <div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setUserInfo({...userInfo, image: URL.createObjectURL(e.target.files[0])})} 
          />
          {fetchedImage ? <img alt='user profile' src={fetchedImage}/> : null}
        </div>
        <div>
          <p>Name:</p>
          {fetchedName ? 
            <>
              <p>{fetchedName}</p>
              <button >Change Name</button>
            </>
             :
            <>
              <input 
                type="text" 
                id="name"
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              />
            </>
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