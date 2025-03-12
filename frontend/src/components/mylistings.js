import { useState } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Badge,
  Dropdown,
} from 'react-bootstrap';

// Dummy Data for Listings
const dummyListings = [
  {
    id: 1,
    title: 'Vintage Chair',
    price: '$120',
    status: 'Active',
    description: 'A beautiful vintage chair perfect for your living room.',
    image: `${process.env.PUBLIC_URL}/dummy-img1.jpg`,
    date: '2023-05-15',
    views: 24,
  },
  {
    id: 2,
    title: 'Modern Lamp',
    price: '$80',
    status: 'Inactive',
    description: 'A sleek modern lamp that fits any decor style.',
    image: 'https://via.placeholder.com/100',
    date: '2023-06-20',
    views: 12,
  },
  {
    id: 3,
    title: 'Cozy Sofa',
    price: '$250',
    status: 'Active',
    description: 'A comfy sofa to relax and unwind after a long day.',
    image: 'https://via.placeholder.com/100',
    date: '2023-07-05',
    views: 36,
  },
];

const MyListings = () => {
  const [listings, setListings] = useState(dummyListings);

  const handleDelete = (id) => {
    const updatedListings = listings.filter((item) => item.id !== id);
    setListings(updatedListings);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for item ${id} is not implemented yet.`);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">My Listings</h4>
        <Button variant="primary" size="sm">
          <i className="bi bi-plus-lg me-1"></i> Add New Listing
        </Button>
      </div>

      {/* Display this message if no listings are available */}
      {listings.length === 0 && (
        <Card className="text-center p-5 border-0 shadow-sm">
          <Card.Body>
            <i
              className="bi bi-clipboard-x"
              style={{ fontSize: '3rem', color: '#6c757d' }}
            ></i>
            <p className="text-muted mt-3 mb-0">No listings available</p>
            <Button variant="outline-primary" className="mt-3">
              Create Your First Listing
            </Button>
          </Card.Body>
        </Card>
      )}

      <Row className="g-3">
        {listings.map((item) => (
          <Col xs={12} key={item.id}>
            <Card className="shadow-sm border-0 listing-item hover-effect">
              <Row className="g-0 align-items-center">
                {/* Image Section */}
                <Col xs={4} md={3} className="p-3">
                  <div className="position-relative">
                    <Card.Img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: '120px', objectFit: 'cover' }}
                    />
                    <Badge
                      bg={item.status === 'Active' ? 'success' : 'secondary'}
                      className="position-absolute top-0 start-0 m-2"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </Col>

                {/* Content Section */}
                <Col xs={8} md={9}>
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <Card.Title className="text-primary fw-bold mb-1 listing-title">
                          {item.title.toUpperCase()}
                        </Card.Title>
                        <Card.Text className="mb-0 listing-price fs-5">
                          <strong>{item.price}</strong>
                        </Card.Text>
                      </div>
                      <Dropdown align="end">
                        <Dropdown.Toggle
                          variant="light"
                          size="sm"
                          className="border-0"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(item.id)}>
                            <i className="bi bi-pencil me-2"></i> Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDelete(item.id)}
                            className="text-danger"
                          >
                            <i className="bi bi-trash me-2"></i> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    <Card.Text className="text-muted listing-description mb-3">
                      {item.description}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex gap-3 text-muted small">
                        <span>
                          <i className="bi bi-calendar3 me-1"></i>{' '}
                          {formatDate(item.date)}
                        </span>
                        <span>
                          <i className="bi bi-eye me-1"></i> {item.views} views
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          <i className="bi bi-pencil me-1"></i> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash me-1"></i> Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .hover-effect {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </Container>
  );
};

export default MyListings;
