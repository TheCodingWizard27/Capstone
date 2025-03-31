import { Card, Carousel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ categoryName, photos, brand, description }) => {
  return (
    <Card className="h-100 shadow-sm border-0 overflow-hidden">
      <Card.Body className="p-0 d-flex flex-column">
        {/* Carousel Section */}
        <div className="position-relative">
          <Link
            to={`/itemList?category=${encodeURIComponent(categoryName)}`}
            className="text-decoration-none"
            onClick={(e) => {
              // Prevent click event from bubbling up if clicking on controls or indicators
              if (
                e.target.closest('.carousel-control-prev') ||
                e.target.closest('.carousel-control-next') ||
                e.target.closest('.carousel-indicators')
              ) {
                e.preventDefault();
              }
            }}
          >
            {photos && photos.length > 0 ? (
              <Carousel
                className="category-carousel"
                indicators={photos.length > 1}
                controls={photos.length > 1}
                interval={5000}
              >
                {photos.map((photo, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={photo || '/placeholder.svg'}
                      alt={`${categoryName} ${index + 1}`}
                      style={{
                        objectFit: 'cover',
                        height: '220px',
                        borderTopLeftRadius: 'calc(0.375rem - 1px)',
                        borderTopRightRadius: 'calc(0.375rem - 1px)',
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light text-secondary"
                style={{ height: '220px' }}
              >
                <span>No images available</span>
              </div>
            )}

            {/* Brand Badge */}
            {brand && (
              <Badge
                bg="light"
                text="dark"
                className="position-absolute top-0 end-0 m-2 px-2 py-1 shadow-sm"
              >
                {brand}
              </Badge>
            )}
          </Link>
        </div>

        {/* Content Section */}
        <div className="p-3">
          <Link
            to={`/itemList?category=${encodeURIComponent(categoryName)}`}
            className="text-decoration-none"
          >
            <Card.Title className="mb-2 text-truncate fw-bold">
              {categoryName}
            </Card.Title>
          </Link>

          {description && (
            <Card.Text
              className="text-muted small mb-0"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.5',
              }}
            >
              {description}
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
