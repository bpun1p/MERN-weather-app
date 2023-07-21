import React, { useState } from 'react';
import './App.css';
import './components/utils/tooltip/Tooltip.css'
import Dashboard from './components/dashboard/Dashboard';
import Nav from './components/Navigation/Nav';
import Profile from './components/profile/Profile';
import Library from './components/MyLibrary/MyLibrary';
import Access from './components/access/Access';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [showState, setShowState] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);

  const buttonClickedHandler = () => {
    setShowState(() => true)
  }

  const modalClickedHandler = () => {
    setShowState(() => false);
  }

  const loggedOutClicked = () => {
    setLoggedOut(() => true)
  }

  const loggedInClicked = () => {
    setLoggedOut(() => false);
  }

  return (
    <BrowserRouter>
      <Access show={showState} modalClicked={modalClickedHandler} loggedOutClicked={loggedOutClicked} loggedInClicked={loggedInClicked}/>
      <Nav/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard buttonClicked={buttonClickedHandler}/>} />
        <Route path='/library' element={<Library/>} />
        <Route path='/profile' element={<Profile buttonClicked={buttonClickedHandler} logOut={loggedOut}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
