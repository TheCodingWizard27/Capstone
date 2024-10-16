import { Navbar } from 'react-bootstrap';
import SearchBar from './searchBar';

import DropDown from './dropDown';

const NavbarBar = () => {
  return (
    <Navbar className="d-flex text-light bg-primary p-3 sticky-top">
      {/* Only the SearchBar */}
      <DropDown />
      <SearchBar />
    </Navbar>
  );
};

export default NavbarBar;
