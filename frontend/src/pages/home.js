import React, { useEffect, useState } from 'react';
import { Spinner, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/navBar';
import CategoryCard from '../components/categoryCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <NavBar />

      <Container
        className="mt-5 mb-5"
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
        }}
      >
        {/* Show search results if available */}
        {/* {searchResults.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : ( */}
        <>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="warning">{error}</Alert>
          ) : categories.length === 0 ? (
            <Alert variant="info">No categories to display.</Alert>
          ) : (
            <Container style={{ paddingTop: '1rem', marginBottom: '3rem' }}>
              <div>
                <Row className="g-4">
                  {categories.map((category) => (
                    <Col xs={12} md={3} key={category.name}>
                      <CategoryCard
                        categoryName={category.name}
                        photos={category.photos}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          )}
        </>
        {/* )} */}
      </Container>
    </>
  );
};

export default Home;
