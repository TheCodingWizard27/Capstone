import React from 'react';

const Card = ({ imageUrl, title, description }) => {
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
        maxWidth: '800px',
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
      <div>
        <h3 style={{ margin: '0 0 10px', fontSize: '1.2em' }}>{title}</h3>
        <p
          style={{
            margin: '0',
            color: '#666',
            fontSize: '0.9em',
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
