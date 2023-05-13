import React from 'react';
import './App.css';
import Search from './components/weather/Weather';
import Nav from './components/navigation/Nav';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Library from './components/myLibrary/MyLibrary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
    <Routes>
      <Route path='/search' element={<Search/>} />
      <Route path='/library' element={<Library/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
