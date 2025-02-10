import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, imageUrl, title, price,brand, description }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '15px',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '80%',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: '150px',
          height: 'auto',
          marginRight: '20px',
          borderRadius: '4px',
        }}
      />
      <div
        style={{
          overflowWrap: 'break-word',
        }}
      >
        <Link to={`/listing/${id}`} className="text-decoration-none">
          <h3 style={{ margin: '0 0 10px', fontSize: '1.2em' }}>{title}</h3>
        </Link>

        {/* Display the brand below the title */}
        <p style={{ margin: '0', color: '#888', fontSize: '1em' }}>
          Price: $<strong>{price}</strong>
        </p>
        <p style={{ margin: '0', color: '#888', fontSize: '1em' }}>
          Brand: <strong>{brand}</strong>
        </p>

        <p
          style={{
            margin: '0',
            color: '#666',
            fontSize: '0.9em',
            lineHeight: '1.5',
            overflowWrap: 'wrap',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
