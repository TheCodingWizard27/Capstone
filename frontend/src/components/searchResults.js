import React, { useState, useEffect } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchResults = ({ results }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (results.length === 0 && location.pathname !== '/') {
      // Show 'Item Not Found' instead of redirecting
    }
  }, [results, location.pathname]);

  const handleViewMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const handleNavigate = (id) => {
    navigate(`/singleListing/${id}`); // Navigate to singleListing with listing id
  };

  return (
    <div>
      {results.length > 0 ? (
        <>
          {results.slice(0, visibleItems).map((listing) => (
            <Card
              key={listing.id}
              className="mb-2 p-3 shadow-sm"
              onClick={() => handleNavigate(listing.id)} // Redirect to single listing page
              style={{ cursor: 'pointer' }}
            >
              {/* Display the first image as the main image */}
              {listing.picUrls && listing.picUrls.length > 0 ? (
                <Card.Img
                  variant="top"
                  src={listing.picUrls[0]} // Display the first image from picUrls
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: listing.picUrls.length === 1 ? 'block' : 'none', // Don't stretch if only one image
                  }}
                />
              ) : (
                <img
                  src="default-image-placeholder.jpg" // Fallback image if no images
                  alt="Preview"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}

              <h5>{listing.title}</h5>
              <p
                className="text-truncate"
                style={{
                  maxWidth: '90%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                ${listing.price}
                <br />
                {listing.description}
              </p>

              {/* Display additional images below if available */}
              {listing.picUrls && listing.picUrls.length > 1 && (
                <Carousel controls={false}>
                  {listing.picUrls.slice(1).map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`Additional image ${index + 1}`}
                        style={{
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Card>
          ))}

          {visibleItems < results.length && (
            <Button variant="primary" onClick={handleViewMore}>
              View More
            </Button>
          )}
        </>
      ) : (
        <p className="text-center mt-3">Item Not Found</p>
      )}
    </div>
  );
};

export default SearchResults;
