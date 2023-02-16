import React from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import SideNav from './components/side-nav/side-nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SideNav/>
    <Routes>
      <Route path='/search' element={<CurrentWeather/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
