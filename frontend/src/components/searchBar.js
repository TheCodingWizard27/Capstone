import { useState, useRef, useEffect } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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

  // Styles
  const styles = {
    searchContainer: {
      position: 'relative',
      width: '100%',
    },
    inputGroup: {
      backgroundColor: 'white',
      borderRadius: '50px',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    searchIcon: {
      backgroundColor: 'white',
      border: 'none',
      paddingLeft: '1.25rem',
      color: '#6c757d',
    },
    searchInput: {
      border: 'none',
      padding: '0.75rem 1.25rem 0.75rem 0.5rem',
      fontSize: '1rem',
      boxShadow: 'none',
    },
    dropdown: {
      position: 'absolute',
      width: '100%',
      marginTop: '0.5rem',
      zIndex: 1000,
      maxHeight: '400px',
      overflowY: 'auto',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: '1px solid rgba(0,0,0,0.08)',
    },
    resultItem: {
      cursor: 'pointer',
      border: 'none',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      padding: '0.75rem 1rem',
    },
    imageContainer: {
      width: '60px',
      height: '60px',
      borderRadius: '8px',
      overflow: 'hidden',
      flexShrink: 0,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    emptyState: {
      padding: '2rem 1rem',
      textAlign: 'center',
      color: '#6c757d',
    },
  };

  // Custom CSS for responsive adjustments
  const customCSS = `
    @media (max-width: 576px) {
      .search-input {
        font-size: 0.9rem !important;
        padding: 0.6rem 0.75rem 0.6rem 0.5rem !important;
      }
      
      .search-icon {
        padding-left: 0.75rem !important;
      }
    }
  `;

  return (
    <>
      <style>{customCSS}</style>
      <div ref={searchRef} style={styles.searchContainer}>
        {/* Search Input */}
        <InputGroup style={styles.inputGroup}>
          <InputGroup.Text style={styles.searchIcon} className="search-icon">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={query}
            onChange={handleSearch}
            style={styles.searchInput}
            className="search-input"
          />
        </InputGroup>

        {/* Search Results Dropdown */}
        {showDropdown && (
          <ListGroup style={styles.dropdown}>
            {results.length > 0 ? (
              results.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  style={styles.resultItem}
                  onClick={() => navigate(`/listing/${item.id}`)}
                  action
                >
                  <div className="d-flex align-items-center">
                    {item.images && item.images[0] && (
                      <div className="me-3" style={styles.imageContainer}>
                        <img
                          src={item.images[0].url || '/placeholder.svg'}
                          alt={item.name}
                          style={styles.image}
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
              <ListGroup.Item style={styles.emptyState}>
                <div className="d-flex flex-column align-items-center">
                  <FaSearch size={24} className="mb-2 opacity-50" />
                  <p className="mb-0">No items found</p>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </div>
    </>
  );
};

export default SearchBar;
