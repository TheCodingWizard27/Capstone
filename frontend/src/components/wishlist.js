// src/components/Wishlist.js
import React, { useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

// Dummy Data for Wishlist
const dummyWishlist = [
  {
    id: 1,
    title: 'Scented Wood',
    price: '$3000',
    brand: 'Brand 2',
    description:
      'This is a piece of furniture in the market. It is made of the old wood.',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    title: 'Leather Bag',
    price: '$220',
    brand: 'Brand 5',
    description: 'A premium leather bag for daily use.',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    title: 'Running Shoes',
    price: '$90',
    brand: 'Brand 7',
    description: 'Comfortable running shoes with high durability.',
    image: 'https://via.placeholder.com/100',
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(dummyWishlist);

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  return (
    <Container>
      <h4 className="mb-3">Wishlist</h4>

      {/* Display this message if wishlist is empty */}
      {wishlist.length === 0 && (
        <p className="text-center text-muted">No items in your wishlist</p>
      )}

      <Row className="g-3">
        {wishlist.map((item) => (
          <Col xs={12} key={item.id}>
            <Card className="shadow-sm border-0 wishlist-item">
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
                    <Card.Title className="text-primary fw-bold mb-1 wishlist-title">
                      {item.title.toUpperCase()}
                    </Card.Title>
                    <Card.Text className="mb-0 wishlist-price">
                      <span className="text-muted">Price: </span>
                      <strong>{item.price}</strong>
                    </Card.Text>
                    <Card.Text className="mb-0 wishlist-brand">
                      <span className="text-muted">Brand: </span>
                      <strong>{item.brand}</strong>
                    </Card.Text>
                    <Card.Text className="text-muted wishlist-description">
                      {item.description}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-1"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
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

export default Wishlist;
