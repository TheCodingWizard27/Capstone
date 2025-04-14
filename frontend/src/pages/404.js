import React from 'react';
import ChromeDinoGame from 'react-chrome-dino';

const NotFound = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <h1 className="mb-3">404 Not Found</h1>
        <h5 className="mb-4 text-muted">
          The link you are trying to reach is not available.
        </h5>
        <div style={{ width: '100%', maxWidth: '600px', height: '300px' }}>
          <ChromeDinoGame />
        </div>
      </div>
    </>
  );
};

export default NotFound;

