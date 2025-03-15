import React, { useState, useEffect } from 'react';
import { Navbar, Button, Col, Row, Container } from 'react-bootstrap';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';
import DropUser from './dropUser';
import './NavBar.css'; // Importing custom CSS
import { useAuth } from '../contexts/authContext';

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false); // Drawer state
  const [cartCount, setCartCount] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    const updateCartCount = () => {
      const userId = currentUser?.uid;
      if (userId) {
        const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        const totalCount = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartCount(totalCount);
      }
    };

    updateCartCount(); // Initial load

    // Listen for storage updates (including when an item is removed)
    window.addEventListener('storage', updateCartCount);

    return () => window.removeEventListener('storage', updateCartCount);
  }, [currentUser]);

  const toggleDrawer = () => setShowDrawer(!showDrawer); // Toggle drawer state

  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      {/* Navbar */}
      <Navbar
        className="text-light bg-primary p-3 position-sticky top-0"
        style={{ zIndex: 1000 }}
      >
        <Container fluid>
          <Row className="w-100 align-items-center justify-evenly">
            {/* Logo or Home Icon based on screen size */}
            <Col lg={2} md={2} xs={2} className="d-flex align-items-center">
              <Link to="/" className="d-lg-none d-flex">
                <FaHome size={25} className="text-white" />
              </Link>
              <Link to="/" className="d-none d-lg-flex">
                <img
                  src="/images/Logo.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxWidth: '120px' }}
                />
              </Link>
            </Col>

            {/* SearchBar with setSearchResults prop */}
            <Col lg={7} xs={9} md={9} className="d-flex justify-content-center">
              <SearchBar setSearchResults={setSearchResults} />
            </Col>

            {/* Toggle Button for Drawer */}
            <Col
              xs={1}
              md={1}
              className="d-lg-none d-flex justify-content-start"
            >
              <Button
                variant="outline-light"
                className="border-0 d-lg-none"
                onClick={toggleDrawer}
                style={{
                  color: 'white',
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                }}
              >
                {showDrawer ? <FaTimes size={25} /> : <FaBars size={25} />}
              </Button>
            </Col>

            {/* Links and Icons for large screens */}
            <Col
              lg={3}
              className="d-none d-lg-flex justify-content-evenly align-items-center"
            >
              <Link
                to="/addListing"
                className="text-white me-3"
                style={{ textDecoration: 'none', fontSize: '1.25rem' }}
              >
                Sell
              </Link>

              {/* Messages Icon */}
              <Link
                to="/messageList"
                className="text-white me-3 position-relative"
                style={{ textDecoration: 'none', fontSize: '1.25rem' }}
              >
                <FaEnvelope size={25} />
              </Link>

              {/* Shopping Cart Icon */}
              <Link
                to="/cart"
                className="text-white me-3 position-relative"
                style={{ textDecoration: 'none', fontSize: '1.25rem' }}
              >
                <FaShoppingCart size={25} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>

              {/* User Dropdown */}
              <DropUser />
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Custom Drawer */}
      <div className={`custom-drawer ${showDrawer ? 'open' : ''} `}>
        <div className="drawer-header">
          <h5 className="text-light mb-0">Menu</h5>
          <Button
            variant="outline-light"
            className="border-0"
            onClick={toggleDrawer}
            style={{ backgroundColor: 'transparent' }}
          >
            <FaTimes size={25} />
          </Button>
        </div>

        <div className="p-3">
          <Link
            to="/addListing"
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
            onClick={toggleDrawer}
          >
            Sell
          </Link>
          <Link
            to="/messageList"
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
            onClick={toggleDrawer}
          >
            Messages
          </Link>
          <Link
            to="/cart"
            state={{ setCartCount }}
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
            onClick={toggleDrawer}
          >
            My Cart
          </Link>
          <DropUser />
        </div>
      </div>

      {/* Overlay to close the drawer */}
      {showDrawer && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </>
  );
};

export default NavBar;
