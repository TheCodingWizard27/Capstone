import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for bars and cross
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  // State to track if the menu is expanded or collapsed
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the menu collapse state
  const handleToggleClick = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-primary text-light p-3 position-sticky top-0"
        style={{ zIndex: 1000 }}
        expanded={!isNavCollapsed} // Control expansion state
      >
        <Container fluid>
          {/* Brand name */}
          <Navbar.Brand className="text-light me-5" href="#home">
            Shop Simplify
          </Navbar.Brand>

          {/* Toggle button for mobile view */}
          <Button
            variant="outline-light"
            className="border-0 d-lg-none"
            onClick={handleToggleClick}
            style={{
              color: 'white',
              borderColor: 'transparent',
              backgroundColor: 'transparent',
            }}
          >
            {isNavCollapsed ? <FaBars size={25} /> : <FaTimes size={25} />}
          </Button>

          {/* Collapsible part */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#why"
                className="text-light me-5"
                onClick={handleToggleClick}
              >
                Why Shop Simplify?
              </Nav.Link>
              <Nav.Link
                href="#features"
                className="text-light me-5"
                onClick={handleToggleClick}
              >
                Explore Features
              </Nav.Link>
              <Nav.Link
                href="#updates"
                className="text-light me-5"
                onClick={handleToggleClick}
              >
                Latest Updates
              </Nav.Link>
            </Nav>

            {/* Buttons */}
            <div className="d-flex">
              <Link to="/signIn">
                <Button variant="outline-light" className="me-2">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-light" className="ms-2">
                  Register
                </Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default LandingNavbar;
