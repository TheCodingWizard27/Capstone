import React from 'react';
import { Card } from 'react-bootstrap';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((listing) => (
          <Card key={listing.id} className="mb-2 p-3 shadow-sm">
            <h5>{listing.title}</h5>
            <p>{listing.description}</p>
          </Card>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
