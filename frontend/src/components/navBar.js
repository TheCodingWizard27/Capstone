import React, { useState } from 'react';
import { Navbar, Button, Col, Row, Container } from 'react-bootstrap';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaBars, FaTimes, FaHome } from 'react-icons/fa';
import DropUser from './dropUser';
import './NavBar.css'; // Importing custom CSS
// import Logo from './images/Logo.png'; // Import the logo image

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false); // Drawer state

  const toggleDrawer = () => setShowDrawer(!showDrawer); // Toggle drawer state

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
                {/* Home icon for small screens */}
                <FaHome size={25} className="text-white" />
              </Link>
              <Link to="/" className="d-none d-lg-flex">
                {/* Logo for large screens */}
                <img
                  src="/images/Logo.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxWidth: '120px' }}
                />
              </Link>
            </Col>

            {/* SearchBar */}
            <Col lg={7} xs={9} md={9} className="d-flex justify-content-center">
              <SearchBar />
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
              <Link
                to="/messageList"
                className="text-white me-3"
                style={{ textDecoration: 'none', fontSize: '1.25rem' }}
              >
                <FaEnvelope size={25} />
              </Link>
              <DropUser /> {/* Replace the FaUser icon with DropUser */}
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
          <DropUser /> {/* Replace "Profile" with DropUser component */}
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
