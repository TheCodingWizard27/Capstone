import { useState, useRef, useEffect } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../style/searchBar.css';

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setResults([]);
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/search?query=${value}`
      );
      setResults(response.data);
      setSearchResults(response.data);
      setShowDropdown(true); // Show dropdown only when searching
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
      setSearchResults([]);
      setShowDropdown(true);
    }
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="search-container">
      {/* Search Input */}
      <InputGroup className="search-input-group">
        <InputGroup.Text className="search-icon">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search Shop Simplify"
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </InputGroup>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <ListGroup className="search-dropdown">
          {results.length > 0 ? (
            results.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="result-item"
                onClick={() => navigate(`/listing/${item.id}`)}
                action
              >
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <FaSearch className="text-muted" />
                  </div>
                  {item.images && item.images[0] && (
                    <div className="me-3 image-container">
                      <img
                        src={item.images[0].url || '/placeholder.svg'}
                        alt={item.name}
                        className="result-image"
                      />
                    </div>
                  )}
                  <div className="flex-grow-1">
                    <h6
                      className="mb-0 text-truncate"
                      style={{ maxWidth: '250px' }}
                    >
                      {item.name}
                    </h6>
                    <p className="mb-0 text-muted small text-truncate">
                      {item.title}
                    </p>
                    <p className="mb-0 fw-bold mt-1">${item.price}</p>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="empty-state">
              <div className="d-flex flex-column align-items-center">
                <FaSearch size={20} className="mb-2 opacity-50" />
                <p className="mb-0">No items found</p>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
