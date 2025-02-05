import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
  const [visibleItems, setVisibleItems] = useState(3); // Initially show 3 items
  const navigate = useNavigate();

  const handleViewMore = () => {
    setVisibleItems((prev) => prev + 3); // Show 3 more items when clicked
  };

  const handleNavigate = (id) => {
    navigate(`/singleListing/${id}`); // Redirect to the single listing page
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
                  maxWidth: '90%', // Limit width for truncation
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

          {/* Show 'View More' Button If There Are More Items */}
          {visibleItems < results.length && (
            <Button variant="primary" onClick={handleViewMore}>
              View More
            </Button>
          )}
        </>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
