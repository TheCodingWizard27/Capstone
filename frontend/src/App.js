import './theme.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router-dom

import LandingPage from './pages/landingPage'; // Import LandingPage

import SignIn from './pages/signIn';
import Register from './pages/register';
import NotFound from './pages/404';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Define the default route for LandingPage */}
          <Route path="/" excat element={<LandingPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
