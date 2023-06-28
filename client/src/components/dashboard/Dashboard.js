import React, { useEffect } from 'react';
import './Dashboard.css'
import { useAuthContext } from '../utils/access/useAuthContext';

export default function Dashboard() {
  const { user } = useAuthContext();
  useEffect(() =>{
    console.log(user)
  },[])
  return (
    <div className='dashboard'>
      <h1 className='dashboard-heading'>Coming Soon</h1>
    </div>
  );
};