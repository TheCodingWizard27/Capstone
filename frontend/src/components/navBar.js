import React from 'react';
import { Navbar } from 'react-bootstrap';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser } from 'react-icons/fa'; // Import FontAwesome message icon
import DropDown from './dropDown';

const NavBar = () => {
  return (
    <Navbar className="d-flex justify-content-evenly align-items-center text-light bg-primary p-3 sticky-top">
      {/* DropDown with responsive width */}
      <div lassName="col-md-3">
        <DropDown />
      </div>

      {/* SearchBar with responsive width */}
      <div className="col-md-9">
        <SearchBar />
      </div>

      {/* Links that show on large devices only */}
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
          className="text-white"
          style={{ textDecoration: 'none', fontSize: '1.25rem' }}
        >
          <FaEnvelope size={25} />
        </Link>
      </div>

      {/* Additional DropDown (if needed) */}
      <div className="d-none d-lg-flex">
        <FaUser size={25} />
      </div>
    </Navbar>
  );
};

export default NavBar;
