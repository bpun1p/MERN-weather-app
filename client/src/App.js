import React from 'react';
import './App.css';
import Search from './components/weather/weather';
import Nav from './components/navigation/nav';
import Library from './components/myLibrary/myLibrary';
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
