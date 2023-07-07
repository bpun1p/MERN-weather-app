import React, { useState } from 'react';
import './App.css';
import './components/utils/tooltip/Tooltip.css'
import Dashboard from './components/dashboard/Dashboard';
import Nav from './components/navigation/Nav';
import Profile from './components/profile/Profile';
import Library from './components/myLibrary/MyLibrary';
import Access from './components/access/Access';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [showState, setShowState] = useState(false)

  const buttonClickedHandler = () => {
    setShowState(showState => showState = true)
  }

  const modalClickedHandler = () => {
    setShowState(showState => showState = false);
  }

  return (
    <BrowserRouter>
      <Access show={showState} modalClicked={modalClickedHandler}/>
      <Nav/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard buttonClicked={buttonClickedHandler}/>} />
        <Route path='/library' element={<Library/>} />
        <Route path='/profile' element={<Profile buttonClicked={buttonClickedHandler}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
