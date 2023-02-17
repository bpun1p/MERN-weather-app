import React from 'react';
import './App.css';
import Search from './components/search-weather/weather';
import SideNav from './components/side-nav/side-nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SideNav/>
    <Routes>
      <Route path='/search' element={<Search/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
