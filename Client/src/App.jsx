// src/App.jsx

import React from 'react';
import LandingPage from './components/LandingPage';
import { Routes,Link, Route } from 'react-router-dom';

function App() {
  return(
  <Routes>
    <Route path="/" element={<LandingPage/>} ></Route>
  </Routes>
  )
}

export default App;
