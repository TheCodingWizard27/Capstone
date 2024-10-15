import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for bars and cross

import SearchBar from './searchBar';

const LandingNavbar = () => {
  // State to track if the menu is expanded or collapsed
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the menu collapse state and unfocus the button
  const handleToggleClick = (e) => {
    setIsNavCollapsed(!isNavCollapsed);
    // Unfocus (blur) the button after it's clicked
    e.currentTarget.blur();
  };

  return (
    <Navbar expand="lg" className="text-light bg-primary p-3 sticky-top">
      {' '}
      {/*Expand when large */}
      {/* Brand name */}
      <Navbar.Brand className="text-light me-5" href="#home">
        Shop Simplify
      </Navbar.Brand>
      {/* Toggle button for mobile view only*/}
      <Navbar.Toggle
        aria-controls="navbar-nav"
        className="bg-light"
        onClick={handleToggleClick} // Apply onClick here to handle blur to unfocus the toggle button on click
      >
        {/* Change the icon based on whether the nav is collapsed */}
        {isNavCollapsed ? <FaBars /> : <FaTimes />}
      </Navbar.Toggle>
      {/* Collapsible part of Navbar for mobile view only */}
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#why" className="text-light me-5">
            Why Shop Simplify?
          </Nav.Link>
          <Nav.Link href="#features" className="text-light me-5">
            Explore Features
          </Nav.Link>
          <Nav.Link href="#updates" className="text-light me-5">
            Latest Updates
          </Nav.Link>
        </Nav>

        {/* Buttons */}
        <Button variant="outline-light" className="me-2">
          Login
        </Button>
        <Button variant="outline-light" className="ms-2">
          Register
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingNavbar;
