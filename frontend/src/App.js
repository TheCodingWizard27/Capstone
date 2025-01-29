import './theme.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from './contexts/authContext'; // Import the useAuth hook

import LandingPage from './pages/landingPage';
import SignIn from './pages/signIn';
import Register from './pages/register';
import AddListing from './pages/addListing';
import NotFound from './pages/404';
import Home from './pages/home';
import ForgotPassword from './pages/forgotPassword';
import SingleListing from './pages/singleListing';
import AccountSettings from './pages/accountInfo';
import ListPage from './pages/itemList';
import MessagingPage from './pages/messageList';

function App() {
  const { userLoggedIn } = useAuth(); // Access userLoggedIn from context

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Authentication routes */}
          <Route
            path="/signIn"
            element={!userLoggedIn ? <SignIn /> : <Navigate to="/home" />}
          />
          <Route
            path="/register"
            element={!userLoggedIn ? <Register /> : <Navigate to="/home" />}
          />
          <Route
            path="/forgotPassword"
            element={
              !userLoggedIn ? <ForgotPassword /> : <Navigate to="/home" />
            }
          />
          <Route
            path="/"
            element={!userLoggedIn ? <LandingPage /> : <Navigate to="/home" />}
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={userLoggedIn ? <Home /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/addListing"
            element={userLoggedIn ? <AddListing /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/listing/:id"
            element={
              userLoggedIn ? <SingleListing /> : <Navigate to="/signIn" />
            }
          />
          <Route
            path="/itemList/:category"
            element={userLoggedIn ? <ListPage /> : <Navigate to="/signIn" />}
          />

          <Route
            path="/accountInfo"
            element={
              userLoggedIn ? <AccountSettings /> : <Navigate to="/signIn" />
            }
          />

          <Route
            path="/messageList"
            element={
              userLoggedIn ? <MessagingPage /> : <Navigate to="/signIn" />
            }
          />

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
