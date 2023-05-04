import React from 'react';
import './App.css';
import Search from './components/weather/Weather';
import Nav from './components/navigation/Nav';
import Library from './components/myLibrary/MyLibrary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
    <Routes>
      <Route path='/search' element={<Search/>} />
      <Route path='/library' element={<Library/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
