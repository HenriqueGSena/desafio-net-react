import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLogin from './components/login/AppLogin';
import AppHome from './components/home/AppHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLogin />} />
        <Route path="/AppHome" element={<AppHome />} />
      </Routes>
    </Router>
  );
}

export default App;
