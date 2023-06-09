import React, { useState } from 'react';
import AccessModal from './AccessModal';
import './Access.css';

export default function Access() {
  const [toggleModal, setToggleModal] = useState(false);

  const toggleAccessModal = () => {
    setToggleModal(!toggleModal);
  }

  return(
    <div className='access'>
        <button onClick={toggleAccessModal}>Login / Sign Up</button>
        {toggleModal ? <AccessModal/> : null}
    </div>
  )
};