import React from 'react';
import './App.css';
import Search from './components/search-weather/weather';
import SideNav from './components/side-nav/side-nav';
import Library from './components/my-library/my-library';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SideNav/>
    <Routes>
      <Route path='/search' element={<Search/>} />
      <Route path='/library' element={<Library/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
