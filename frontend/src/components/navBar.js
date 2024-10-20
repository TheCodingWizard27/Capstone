import React, { useState } from 'react';
import { Navbar, Button, Col, Row, Container } from 'react-bootstrap';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import DropDown from './dropDown';
import './NavBar.css'; // Importing custom CSS

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
            {/* DropDown for large screens */}
            <Col lg={2} md={2} xs={12}>
              <DropDown />
            </Col>

            {/* SearchBar */}
            <Col
              lg={7}
              xs={11}
              md={9}
              className="d-flex justify-content-center"
            >
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
                to="/messages"
                className="text-white me-3"
                style={{ textDecoration: 'none', fontSize: '1.25rem' }}
              >
                <FaEnvelope size={25} />
              </Link>
              <FaUser size={25} className="text-white" />
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
            to="/messages"
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
            onClick={toggleDrawer}
          >
            Messages
          </Link>
          <div
            className="d-flex align-items-center text-light"
            style={{ fontSize: '1.25rem' }}
          >
            Profile
          </div>
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
