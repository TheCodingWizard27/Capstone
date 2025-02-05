import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/navBar';
import SearchResults from '../components/searchResults';
import CategoryCard from '../components/categoryCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/categoriesInfo`
        );
        setCategories(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No data available at the moment. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Navbar (Assuming SearchBar is inside NavBar) */}
      <NavBar setSearchResults={setSearchResults} />

      <Container className="mt-5 mb-5">
        {/* Show search results if available */}
        {searchResults.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <Alert variant="warning">{error}</Alert>
            ) : categories.length === 0 ? (
              <Alert variant="info">No categories to display.</Alert>
            ) : (
              <Row className="g-5">
                {categories.map((category) => (
                  <Col xs={12} md={6} lg={4} key={category.name}>
                    <CategoryCard
                      categoryName={category.name}
                      photos={category.photos}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
