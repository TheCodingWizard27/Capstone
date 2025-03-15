import React, { useState } from 'react';
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

  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem('cart'))?.length || 0
  );

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === details.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
      cart.push({
        id: details.id,
        title: details.title,
        brand: details.brand,
        category: details.category,
        price: details.price,
        imageUrl: details.picUrls[0], // First image as thumbnail
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length); // Update cart count

    // Show confirmation toast (optional)
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
            onClick={() => handleContactSeller(details.id, details.sellerName)}
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
