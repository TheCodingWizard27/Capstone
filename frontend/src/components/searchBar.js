import React, { useState } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setResults([]);
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/search?query=${value}`
      );
      setResults(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  return (
    <div className="position-relative w-100">
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
      {results.length > 0 && (
        <ListGroup className="search-dropdown">
          {results.map((item) => (
            <ListGroup.Item key={item.id} className="search-item">
              <strong>{item.name}</strong>
              <p className="mb-0 text-muted">{item.title}</p>
              <p className="mb-0 text-muted">${item.price}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
