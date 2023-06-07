import React from 'react';
import Login from './Login';
import Register from './Register';

export default function AccessFrame() {

  return(
    <div>
      <div>
        <Login/>
      </div>
      <div>
        <Register/>
      </div>
    </div>
  )
};