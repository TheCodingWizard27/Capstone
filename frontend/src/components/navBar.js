import React from 'react';
import { Navbar, Button, Col, Row } from 'react-bootstrap';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaBars } from 'react-icons/fa';
import DropDown from './dropDown';

const NavBar = () => {
  return (
    <Navbar className="text-light bg-primary p-3 fixed-top">
      <Row className="w-100 align-items-center justify-evenly">
        {/* Toggle Button for smaller screens */}

        {/* DropDown for large screens */}
        <Col lg={2} md={2} xs={12}>
          <DropDown />
        </Col>

        {/* SearchBar: Takes 70% on smaller screens */}
        <Col lg={7} xs={10} md={8} className="d-flex justify-content-center">
          <SearchBar />
        </Col>

        <Col xs={2} md={2} className="d-md-none d-flex justify-content-start">
          <Button variant="outline-light">
            <FaBars size={25} />
          </Button>
        </Col>

        {/* Links and Icons for large screens */}
        <Col lg={3} className="d-none d-lg-flex justify-content-evenly">
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
    </Navbar>
  );
};

export default NavBar;
