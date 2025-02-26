import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Form,
} from 'react-bootstrap';
import NavBar from '../components/navBar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to checkout page
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + (parseFloat(item.price) || 0), 0)
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return <h3 className="text-center mt-5">Your cart is empty.</h3>;
  }

  return (
    <>
      <div>
        {/* Add the Navbar component */}
        <NavBar />
        <h2 className="mt-4 ms-5">Your Shopping Cart</h2>
        <div className="ms-5">
          <Row>
            {cartItems.map((item) => (
              <Col key={item.id} md={10} className="mb-3">
                <Card className="p-3 d-flex flex-row align-items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="me-3"
                  />
                  <div style={{ flex: 1 }}>
                    <h5>{item.title}</h5>
                    <p>
                      <strong>Brand:</strong> {item.brand}
                    </p>
                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p>
                      <strong>Price:</strong> ${item.price}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <h4 className="mt-3 ms-5">Subtotal: ${calculateSubtotal()}</h4>
        <Button
          variant="success"
          className="mt-3 ms-5"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </>
  );
};

export default Cart;
