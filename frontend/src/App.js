import './theme.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router-dom

import LandingPage from './pages/landingPage'; // Import LandingPage

import SignIn from './pages/signIn';
import Register from './pages/register';
import AddListing from './pages/addListing';
import NotFound from './pages/404';
import Home from './pages/home';
import Category from './pages/category';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      <Router>
        <Routes>
          Define the default route for LandingPage
          {/* <Route
            path="/"
            excat
            element={!isAuthenticated ? <LandingPage /> : <Home />}
          /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addListing" element={<AddListing />} />
          <Route path="/category" element={<Category />} />
          <Route path="*" element={<NotFound />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
