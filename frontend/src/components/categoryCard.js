import React, { useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';

const CategoryCard = ({ categoryName, photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Optional: useEffect if you want to cycle through images yourself
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos]);

  return (
    <Card className="h-180">
      <Card.Body>
        <Card.Title>{categoryName}</Card.Title>
        <Carousel>
          {photos.map((photo, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={photo}
                alt={`${categoryName} photo ${index + 1}`}
                style={{ objectFit: 'cover', height: '300px' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
