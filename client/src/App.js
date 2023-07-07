import React from 'react';
import './App.css';
import './components/utils/tooltip/Tooltip.css'
import Dashboard from './components/dashboard/Dashboard';
import Nav from './components/navigation/Nav';
import Profile from './components/profile/Profile';
import Library from './components/myLibrary/MyLibrary';
import Access from './components/access/Access';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Access/>
      <Nav/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/library' element={<Library/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
