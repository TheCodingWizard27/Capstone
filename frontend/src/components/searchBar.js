import { Container, Form } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchContent, setSearchContent] = useState('');
  const inputRef = useRef(null); // Create a ref to access the input element
  const [focused, setFocused] = useState(false);

  const focus = () => {
    alert('Hello');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form Submitted with search content: ${searchContent}`);
    setSearchContent(''); // Clear the form
    inputRef.current.blur(); // Unfocus the input field
  };

  const handleChange = (e) => {
    setSearchContent(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '95%' }}>
      <Form.Control
        type="text"
        value={searchContent}
        onChange={handleChange}
        placeholder="&#xf002; Search..."
        ref={inputRef}
        style={{
          width: '100%',
          backgroundColor: '#669ebb',
          border: focused ? '1px solid white' : 'none', // Add a visible border
          outline: 'none',
          color: 'white',
          padding: '10px',
          fontFamily: 'Arial, FontAwesome',
          fontSize: '16px',
          borderRadius: '4px', // Add some border radius for better appearance
          transition: 'border-color 0.3s ease',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Form>
  );
};

export default SearchBar;
