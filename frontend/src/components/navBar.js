import { Navbar } from 'react-bootstrap';
import SearchBar from './searchBar';

const NavbarBar = () => {
  return (
    <Navbar expand="lg" className="text-light bg-primary p-3 sticky-top">
      {/* Only the SearchBar */}
      <SearchBar />
    </Navbar>
  );
};

export default NavbarBar;
