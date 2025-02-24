// src/components/MyListings.js
import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

// Dummy Data for Listings
const dummyListings = [
  {
    id: 1,
    title: 'Vintage Chair',
    price: '$120',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Modern Lamp',
    price: '$80',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Cozy Sofa',
    price: '$250',
    image: 'https://via.placeholder.com/150',
  },
];

const MyListings = () => {
  const [listings, setListings] = useState(dummyListings);

  const handleDelete = (id) => {
    const updatedListings = listings.filter((item) => item.id !== id);
    setListings(updatedListings);
  };

  return (
    <div>
      <h4 className="mb-3">My Listings</h4>
      <Row className="g-4">
        {listings.map((item) => (
          <Col xs={12} md={6} key={item.id}>
            <Card className="shadow-sm">
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Price: {item.price}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary">Edit</Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyListings;
