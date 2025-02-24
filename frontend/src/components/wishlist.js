// src/components/Wishlist.js
import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

// Dummy Data for Wishlist
const dummyWishlist = [
  {
    id: 1,
    title: 'Elegant Watch',
    price: '$180',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Leather Bag',
    price: '$220',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Running Shoes',
    price: '$90',
    image: 'https://via.placeholder.com/150',
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(dummyWishlist);

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  return (
    <div>
      <h4 className="mb-3">Wishlist</h4>
      <Row className="g-4">
        {wishlist.map((item) => (
          <Col xs={12} md={6} key={item.id}>
            <Card className="shadow-sm">
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Price: {item.price}</Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Wishlist;
