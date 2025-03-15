import React, { useState, useEffect } from 'react';
import { Navbar, Button, Col, Row, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';
import DropUser from './dropUser';
import SearchBar from './searchBar'; // Import SearchBar from file1
import './NavBar.css';

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { currentUser } = useAuth();
  const { cartCount } = useCart(); // Access cart count from CartContext
  const [searchResults, setSearchResults] = useState([]); // State to hold search results

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <Navbar
      className="text-light bg-primary p-3 position-sticky top-0"
      style={{ zIndex: 1000 }}
    >
      <Container fluid>
        <Row className="w-100 align-items-center justify-evenly">
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

          {/* Add the SearchBar here */}
          <Col lg={7} xs={9} md={9} className="d-flex justify-content-center">
            <SearchBar setSearchResults={setSearchResults} />{' '}
            {/* Add SearchBar */}
          </Col>

          <Col xs={1} md={1} className="d-lg-none d-flex justify-content-start">
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
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* User Dropdown */}
            <DropUser />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
