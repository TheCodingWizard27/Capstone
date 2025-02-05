import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchResults = ({ results }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the search query is empty and navigate back when cleared
  useEffect(() => {
    if (results.length === 0 && location.pathname !== '/') {
      // Show 'Item Not Found' instead of redirecting
    }
  }, [results, location.pathname]);

  const handleViewMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const handleNavigate = (id) => {
    navigate(`/singleListing/${id}`);
  };

  return (
    <div>
      {results.length > 0 ? (
        <>
          {results.slice(0, visibleItems).map((listing) => (
            <Card
              key={listing.id}
              className="mb-2 p-3 shadow-sm"
              onClick={() => handleNavigate(listing.id)}
              style={{ cursor: 'pointer' }}
            >
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
                <br></br>
                {listing.description}
              </p>
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
