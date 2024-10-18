import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaBars } from 'react-icons/fa'; // Import icons
import DropDown from './dropDown';

const NavBar = () => {
  return (
    <Navbar className="d-flex justify-content-between align-items-center text-light bg-primary p-3 sticky-top">
      {/* SearchBar - Visible on all screen sizes */}

      <div className="d-none d-lg-flex">
        <DropDown />
      </div>
      <div className="col-md-9 col-sm-12">
        <SearchBar />
      </div>

      {/* Toggle Button for smaller screens */}
      <div className="d-md-none">
        <Button variant="outline-light">
          <FaBars size={25} />
        </Button>
      </div>

      {/* Links and icons - Visible only on large screens */}
      <div className="d-none d-lg-flex">
        <Link
          to="/addListing"
          className="text-white me-3"
          style={{ textDecoration: 'none', fontSize: '1.25rem' }}
        >
          Sell
        </Link>
      </div>
      <div className="d-none d-lg-flex">
        <Link
          to="/messages"
          className="text-white me-3"
          style={{ textDecoration: 'none', fontSize: '1.25rem' }}
        >
          <FaEnvelope size={25} />
        </Link>
      </div>
      <div className="d-none d-lg-flex">
        <FaUser size={25} />
      </div>
    </Navbar>
  );
};

export default NavBar;
