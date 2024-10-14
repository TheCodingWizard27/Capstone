import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import SignIn from './pages/signIn';
import Register from './pages/register';

import "./theme.scss"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/pages/signIn" element={<SignIn />} />
        <Route path="/pages/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
