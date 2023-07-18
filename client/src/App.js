import React, { useState } from 'react';
import './App.css';
import './components/utils/tooltip/Tooltip.css'
import Dashboard from './components/dashboard/Dashboard';
import Nav from './components/nav/Nav';
import Profile from './components/profile/Profile';
import Library from './components/library/Library';
import Access from './components/access/Access';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [showState, setShowState] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);

  const buttonClickedHandler = () => {
    setShowState(showState => showState = true)
  }

  const modalClickedHandler = () => {
    setShowState(showState => showState = false);
  }

  const loggedOutClicked = () => {
    setLoggedOut(loggedOut => loggedOut = true)
  }

  const loggedInClicked = () => {
    setLoggedOut(loggedOut => loggedOut = false);
  }

  return (
    <BrowserRouter>
      <Access show={showState} modalClicked={modalClickedHandler} loggedOutClicked={loggedOutClicked} loggedInClicked={loggedInClicked}/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Dashboard buttonClicked={buttonClickedHandler}/>} />
        <Route path='/library' element={<Library/>} />
        <Route path='/profile' element={<Profile buttonClicked={buttonClickedHandler} logOut={loggedOut}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
