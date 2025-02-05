import React from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ categoryName, photos, brand, description }) => {
  return (
    <Card className="h-180">
      <Card.Body>
        <Link
          to={`/itemList?category=${encodeURIComponent(categoryName)}`}
          className="text-decoration-none"
        >
          <Card.Title>{categoryName}</Card.Title>
        </Link>

        <p>{brand}</p> {/* Display the brand */}
        <p>{description}</p> {/* Display the description */}

        <Carousel>
          {photos && photos.length > 0 ? (
            photos.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={photo}
                  alt={`Image for ${categoryName} ${index + 1}`}
                  style={{ objectFit: 'cover', height: '300px' }}
                />
              </Carousel.Item>
            ))
          ) : (
            <p>No images available</p> // Fallback in case no images are available
          )}
        </Carousel>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
