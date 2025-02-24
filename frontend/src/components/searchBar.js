import React, { useState, useRef, useEffect } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="position-relative w-100" ref={searchRef}>
      {/* Search Input */}
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search items..."
          value={query}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <ListGroup className="search-dropdown">
          {results.length > 0 ? (
            results.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="search-item"
                onClick={() => navigate(`/listing/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  {item.images && item.images[0] && (
                    <img
                      src={item.images[0].url} // Show first image
                      alt="Preview"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        marginRight: '10px',
                      }}
                    />
                  )}
                  <div>
                    <strong>{item.name}</strong>
                    <p className="mb-0 text-muted">{item.title}</p>
                    <p className="mb-0 text-muted">${item.price}</p>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="search-item text-center text-muted">
              Item Not Found
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
