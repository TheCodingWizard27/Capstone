// src/components/MyListings.js
import React, { useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

// Dummy Data for Listings
const dummyListings = [
  {
    id: 1,
    title: 'Vintage Chair',
    price: '$120',
    status: 'Active',
    description: 'A beautiful vintage chair perfect for your living room.',
    image: `${process.env.PUBLIC_URL}/dummy-img1.jpg`,
  },
  {
    id: 2,
    title: 'Modern Lamp',
    price: '$80',
    status: 'Inactive',
    description: 'A sleek modern lamp that fits any decor style.',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    title: 'Cozy Sofa',
    price: '$250',
    status: 'Active',
    description: 'A comfy sofa to relax and unwind after a long day.',
    image: 'https://via.placeholder.com/100',
  },
];

const MyListings = () => {
  const [listings, setListings] = useState(dummyListings);

  const handleDelete = (id) => {
    const updatedListings = listings.filter((item) => item.id !== id);
    setListings(updatedListings);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for item ${id} is not implemented yet.`);
  };

  return (
    <Container>
      <h4 className="mb-3">My Listings</h4>

      {/* Display this message if no listings are available */}
      {listings.length === 0 && (
        <p className="text-center text-muted">No listings available</p>
      )}

      <Row className="g-3">
        {listings.map((item) => (
          <Col xs={12} key={item.id}>
            <Card className="shadow-sm border-0 listing-item">
              <Row className="g-0 align-items-center">
                {/* Image Section */}
                <Col xs={4} md={3} className="p-2">
                  <Card.Img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded"
                  />
                </Col>

                {/* Content Section */}
                <Col xs={8} md={9}>
                  <Card.Body className="p-2">
                    <Card.Title className="text-primary fw-bold mb-1 listing-title">
                      {item.title.toUpperCase()}
                    </Card.Title>
                    <Card.Text className="mb-0 listing-price">
                      <span className="text-muted">Price: </span>
                      <strong>{item.price}</strong>
                    </Card.Text>
                    <Card.Text className="text-muted listing-description">
                      {item.description}
                    </Card.Text>
                    <div className="d-flex gap-2 mt-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyListings;
