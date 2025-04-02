import { useState } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import DropUser from './dropUser';
import SearchBar from './searchBar';
import '../style/blueBar.css';

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { currentUser } = useAuth();
  const { cartCount } = useCart();
  const [searchResults, setSearchResults] = useState([]);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <>
      <Navbar className="blue-navbar">
        <Container className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo-container">
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="img-fluid logo-image"
            />
          </Link>

          {/* Search Bar */}
          <div className="search-container ms-1">
            <SearchBar setSearchResults={setSearchResults} />
          </div>

          {/* Mobile Toggle */}
          <Button className="mobile-toggle ms-5" onClick={toggleDrawer}>
            <FaBars size={24} />
          </Button>

          {/* Desktop Navigation */}
          <div className="desktop-nav nav-links">
            <div className="sell-container">
              <Link to="/addListing" className="nav-link">
                <span>Sell</span>
              </Link>
            </div>

            <Link to="/messageList" className="nav-link">
              <FaEnvelope size={25} />
              <span>Messages</span>
            </Link>

            <Link to="/cart" className="nav-link">
              <div style={{ position: 'relative' }}>
                <FaShoppingCart size={25} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            <div className="dropdown-user-wrapper">
              <DropUser />
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Drawer */}
      <div className={`drawer ${showDrawer ? 'open' : ''}`}>
        <div className="drawer-header">
          <h5 style={{ color: 'white', margin: 0 }}>Menu</h5>
          <Button
            style={{ backgroundColor: 'transparent', border: 'none' }}
            onClick={toggleDrawer}
          >
            <FaTimes size={24} color="white" />
          </Button>
        </div>

        <div className="drawer-content">
          <div className="drawer-sell-container">
            <Link
              to="/addListing"
              className="drawer-sell-link"
              onClick={toggleDrawer}
            >
              Sell
            </Link>
          </div>

          <Link
            to="/messageList"
            className="drawer-link"
            onClick={toggleDrawer}
          >
            Messages
          </Link>

          <Link to="/cart" className="drawer-link" onClick={toggleDrawer}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          <div style={{ marginTop: '1rem' }}>
            <DropUser />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showDrawer && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </>
  );
};

export default NavBar;
