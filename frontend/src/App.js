import './theme.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router-dom

import LandingPage from './pages/landingPage'; // Import LandingPage

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Define the default route for LandingPage */}
          <Route path="/" element={<LandingPage />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
