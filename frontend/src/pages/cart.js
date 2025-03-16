import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import NavBar from '../components/navBar';
import { useAuth } from '../contexts/authContext';
import { createThread } from '../api/message';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { setCartCount } = useCart();

  const handleContactSeller = async (listingId, sellerName) => {
    try {
      const response = await createThread(listingId, currentUser);
      console.log(response);
      navigate(
        `/messageList?threadId=${response.threadId}&userName=${sellerName}`
      );
    } catch (error) {
      alert(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCartItems(storedCart);
      const totalCount = storedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(totalCount); // Update cart count on load
    }
  }, [currentUser, setCartCount]);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    const totalCount = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalCount); // Update cart count after item removal

    const userId = currentUser?.uid;
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
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
      <NavBar />
      <h2 className="mt-4 ms-5">Your Shopping Cart</h2>
      <div className="ms-5">
        <Row>
          {cartItems.map((item) => (
            <Col key={item.id} md={10} className="mb-3">
              <Card className="p-3 d-flex flex-row align-items-center">
                <Link to={`/listing/${item.id}`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="me-3"
                  />
                </Link>
                <div style={{ flex: 1 }}>
                  {/* Wrap the title in a Link to navigate to the single listing page */}
                  <Link
                    to={`/listing/${item.id}`}
                    className="text-decoration-none"
                  >
                    <h5>{item.title}</h5>
                  </Link>
                  <div>
                    <strong>Price:</strong> ${item.price}
                  </div>
                  <div>
                    <strong>Brand:</strong> {item.brand}
                  </div>
                  <div>
                    <strong>Category:</strong> {item.category}
                  </div>
                  <div>
                    <strong>Description:</strong> {item.description}
                  </div>
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                  <p></p>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() =>
                      handleContactSeller(item.id, item.sellerName)
                    }
                  >
                    Contact Seller
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <h4 className="mt-3 ms-5">Subtotal: ${calculateSubtotal()}</h4>
      <Button variant="success" className="mt-3 ms-5" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </>
  );
};

export default Cart;
