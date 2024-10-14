import React, { useState } from 'react';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const NavigationBar = () => {
  // State to track if the menu is expanded or collapsed
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the menu collapse state and unfocus the button
  const handleToggleClick = (e) => {
    setIsNavCollapsed(!isNavCollapsed);
    // Unfocus (blur) the button after it's clicked
    e.currentTarget.blur();
  };

  return (
    <Navbar expand="lg" className="text-light bg-primary p-3">  {/*Expand when large */}
   
        {/* Brand name */}
        <Navbar.Brand className="text-light me-5" as={Link} to="/">
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
            <Nav.Link as={Link} to="#why" className="text-light me-5">
              Why Shop Simplify?
            </Nav.Link>
            <Nav.Link as={Link} to="#features" className="text-light me-5">
              Explore Features
            </Nav.Link>
            <Nav.Link as={Link} to="#updates" className="text-light me-5">
              Latest Updates
            </Nav.Link>
          </Nav>

          {/* Buttons */}
          <Link to="/pages/signIn">
            <Button variant="outline-light" className="me-2">
              Login
            </Button>
          </Link>

          <Link to="/pages/register">
            <Button variant="outline-light" className="ms-2">
              Register
            </Button>
          </Link>
        </Navbar.Collapse>
     
    </Navbar>
  );
};

export default NavigationBar;
