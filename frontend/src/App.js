import './theme.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router-dom

import LandingPage from './pages/landingPage'; // Import LandingPage

import SignIn from './pages/signIn';
import Register from './pages/register';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Define the default route for LandingPage */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pages/signIn" element={<SignIn />} />
          <Route path="/pages/register" element={<Register />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
