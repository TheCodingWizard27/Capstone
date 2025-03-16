import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Image,
  Button,
  Card as BootstrapCard,
  Col,
  Collapse,
} from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from './itemCard';
import { useAuth } from '../contexts/authContext';
import { createThread } from '../api/message';

// Main product image section with prev/next functionality
export const MainProductSection = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handlePreviewClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Col md={12} lg={6} className="d-flex flex-column align-items-center mt-4">
      <BootstrapCard className="picture-card p-3 mb-2">
        <div className="main-image">
          <Image src={images[currentImageIndex]} alt="Main Image" fluid />
          <button className="arrow-left" onClick={handlePrevImage}>
            <FaArrowLeft />
          </button>
          <button className="arrow-right" onClick={handleNextImage}>
            <FaArrowRight />
          </button>
        </div>
        <div className="preview-images d-flex flex-row flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className={`preview-image mb-2 ${
                index === currentImageIndex ? 'active' : ''
              }`}
              onClick={() => handlePreviewClick(index)}
              style={{
                height: '100px',
                width: '15%',
                minWidth: '100px',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      </BootstrapCard>
    </Col>
  );
};

// Product details section
export const ProductDetailsSection = ({ details }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleContactSeller = async (listingId, sellerName, productName) => {
    try {
      // Pass listingId and currentUser (buyer) when creating a thread
      const response = await createThread(listingId, currentUser); // Ensure createThread returns the threadId in response
      console.log(response);
      
      // Check if the response contains the threadId
      if (response && response.threadId) {
        navigate(
          `/messageList?threadId=${response.threadId}&userName=${sellerName}&itemName=${productName}`
        );
      } else {
        throw new Error('Failed to create thread');
      }
    } catch (error) {
      console.error(error);
      alert(`${error.response?.data?.error || 'An error occurred'}`);
    }
  };
  

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const userId = currentUser?.uid;
    if (userId) {
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const updatedCartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(updatedCartCount);
    }

    const handleStorageChange = () => {
      const userId = currentUser?.uid;
      if (userId) {
        const updatedCart =
          JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        setCartCount(
          updatedCart.reduce((total, item) => total + item.quantity, 0)
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentUser]); // Depend on currentUser to reset cart count when user logs in/out

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please log in to add items to your cart.');
      return;
    }

    if (details.user === currentUser.uid) {
      alert("You can't add your own listing to the cart.");
      return;
    }

    const userId = currentUser.uid;
    let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    // Check if the item is already in the cart
    const existingItem = cart.find((item) => item.id === details.id);

    if (existingItem) {
      alert('This item is already in your cart.');
      return; // Do not add the item again if it's already in the cart
    } else {
      // If the item is not in the cart, add it
      cart.push({
        id: details.id,
        title: details.title,
        brand: details.brand,
        category: details.category,
        price: details.price,
        description:
          details.description.length > 100
            ? details.description.slice(0, 100) + '...'
            : details.description,
        imageUrl: details.picUrls[0],
        quantity: 1, // Item is added with a quantity of 1
      });
    }

    // Update the cart in local storage
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));

    // Recalculate the cart count
    const updatedCartCount = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Update the cart count state immediately
    setCartCount(updatedCartCount);

    // Trigger a storage event to notify other parts of the app (like navigation bar, etc.)
    window.dispatchEvent(new Event('storage'));

    alert(`${details.title} added to cart!`);
  };

  return (
    <Col md={12} lg={6} className="d-flex flex-column align-items-start mt-4">
      <BootstrapCard className="details-card p-3">
        <h4>{details.title}</h4>
        <div className="rating mb-2">
          <span style={{ color: '#005d8d', fontSize: '20px' }}>
            Seller Name:{' '}
          </span>
          <span style={{ color: '#005d8d', fontSize: '20px' }}>
            {details.sellerName}
          </span>
        </div>
        <div className="price mb-2">${details.price}</div>
        <div>
          <strong>Brand:</strong> {details.brand}
        </div>
        <div>
          <strong>Condition:</strong> {details.condition}
        </div>
        <div>
          <strong>Status:</strong> {details.status}
        </div>
        <hr />
        <p>{details.description}</p>
        <div className="button-group mt-3">
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleContactSeller(details.id, details.sellerName, details.title)}
          >
            Contact Seller
          </Button>
          <Button variant="dark" className="me-2" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              navigate(`/editListing/${details.id}`, {
                state: {
                  id: details.id,
                  formData: details,
                  files: details.picUrls.map((url) => ({ preview: url })),
                },
              })
            }
          >
            Edit Listing
          </Button>
        </div>
      </BootstrapCard>
    </Col>
  );
};

// Item list section for similar & other items
export const ItemSection = ({ title, items, open, toggleOpen }) => (
  <BootstrapCard className="floating-card p-4" style={{ width: '100%' }}>
    <h5 className="section-title">{title}</h5>
    <Collapse in={open}>
      <div className="horizontal-scroll">
        {items.map((item, idx) => (
          <div key={idx} className="scroll-item" style={{ cursor: 'pointer' }}>
            <Link to={`/listing/${item.id}`} className="text-decoration-none">
              <Card
                id={item.id}
                imageUrl={item.picUrls[0]}
                title={item.title}
                brand={item.brand}
                price={item.price}
                onClick={() => window.location.reload()}
              />
            </Link>
          </div>
        ))}
      </div>
    </Collapse>
    <Button variant="link" onClick={toggleOpen} className="collapse-button">
      {open ? 'Collapse' : 'Expand'} {title}
    </Button>
  </BootstrapCard>
);
