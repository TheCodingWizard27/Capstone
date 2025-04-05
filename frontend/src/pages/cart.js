import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import { Row, Col, Button, Card, Image } from 'react-bootstrap';
import NavBar from '../components/navBar';
import { useAuth } from '../contexts/authContext';
import { createThread } from '../api/message';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { setCartCount } = useCart();

  const handleContactSeller = async (listingId, sellerName, productName) => {
    try {
      // Pass listingId, currentUser (buyer), and productName when creating a thread
      console.log('Creating thread with product name:', productName);
      const response = await createThread(listingId, currentUser, productName);
      console.log('Thread creation response:', response);

      // Check if the response contains the threadId
      if (response && response.threadId) {
        navigate(
          `/messageList?threadId=${response.threadId}&userName=${sellerName}&itemName=${productName}`
        );
      } else {
        throw new Error('Failed to create thread');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      alert(`${error.response?.data?.error || 'An error occurred'}`);
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
    return <h3 className="text-center mt-5">Your wishlist is empty.</h3>;
  }

  return (
    <>
      <NavBar />
      <h2 className="mt-4 ms-5">Your Wishlist</h2>
      <div
        className="ms-5"
        style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Row>
          {cartItems.map((item) => (
            <Col key={item.id} md={10} className="mb-3">
              <Card className="p-3 d-flex flex-row align-items-center">
                <Link to={`/listing/${item.id}`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={80}
                    height={80}
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
                      handleContactSeller(item.id, item.user, item.title)
                    }
                  >
                    Contact
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <h4 className="mt-3 mb-4">Subtotal: ${calculateSubtotal()}</h4>
      </div>

      {/* <Button variant="success" className="mt-3 ms-5" onClick={handleCheckout}>
        Proceed to Checkout
      </Button> */}
    </>
  );
};

export default Cart;
