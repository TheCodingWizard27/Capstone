import './theme.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext/index'; // Import the useAuth hook

import LandingPage from './pages/landingPage';
import SignIn from './pages/signIn';
import Register from './pages/register';
import AddListing from './pages/addListing';
import NotFound from './pages/404';
import Home from './pages/home';
import Category from './pages/category';
import ForgotPassword from './pages/forgotPassword';
<<<<<<< HEAD
import SingleListing from './pages/singleLIsting';
=======
import SearchPage from './pages/searchItem'; 
>>>>>>> c09184bf72ad3ba3a86e8bfc7361ffd73e534dd2

function App() {
  const { userLoggedIn } = useAuth(); // Access userLoggedIn from context

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Authentication routes */}
          <Route path="/signIn" element={!userLoggedIn ? <SignIn /> : <Navigate to="/home" />} />
          <Route path="/register" element={!userLoggedIn ? <Register /> : <Navigate to="/home" />} />
          <Route path="/forgotPassword" element={!userLoggedIn ? <ForgotPassword /> : <Navigate to="/home" />} />
          <Route path="/" element={!userLoggedIn ? <LandingPage /> : <Navigate to="/home" />} />

          {/* Protected routes */}
          <Route path="/home" element={userLoggedIn ? <Home /> : <Navigate to="/signIn" />} />
          <Route path="/addListing" element={userLoggedIn ? <AddListing /> : <Navigate to="/signIn" />} />
          <Route path="/category" element={userLoggedIn ? <Category /> : <Navigate to="/signIn" />} />
<<<<<<< HEAD
          <Route path="/singleListing" element={userLoggedIn ? <SingleListing /> : <Navigate to="/singleListing" />} />
=======
          <Route path="/searchItem" element={userLoggedIn ? <SearchPage /> : <Navigate to="/signIn" />} />
          
>>>>>>> c09184bf72ad3ba3a86e8bfc7361ffd73e534dd2
          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
