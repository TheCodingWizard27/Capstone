import NavBar from '../components/navBar';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

import CategoryCard from '../components/categoryCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

 useEffect(() => {
   const fetchCategories = async () => {
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_BACKEND}/api/categoriesInfo`
       );
       console.log(response.data);
       setCategories(response.data);
       setError(null); // Reset error if successful
     } catch (err) {
       console.error(err);
       setError('No data available at the moment. Please try again later.');
     } finally {
       setLoading(false); // Set loading to false after fetching
     }
   };

   fetchCategories();
 }, []);

 
  return (
    <>
      <NavBar />
      <Container className="mt-5 mb-5">
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
      </Container>
    </>
  );
};

export default Home;
