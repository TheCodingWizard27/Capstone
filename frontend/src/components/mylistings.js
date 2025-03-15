'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Badge,
  Dropdown,
  Spinner,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null); // Track which item is being deleted
  const [statusLoading, setStatusLoading] = useState(null); // Track which item is having status updated

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch listings from backend when component mounts
  useEffect(() => {
    if (currentUser) {
      fetchMyListings();
    }
  }, [currentUser]);

  // Function to fetch listings from the backend
  const fetchMyListings = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!currentUser || !currentUser.uid) {
        setError(
          'User not authenticated. Please log in to view your listings.'
        );
        setLoading(false);
        return;
      }

      // Use the correct API endpoint with the user ID
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/my-listings/${currentUser.uid}`
      );
      console.log('Listings data received:', response.data);

      // Ensure all listings have a status field (default to "active" if not present)
      const processedListings = response.data.map((listing) => ({
        ...listing,
        status: listing.status || 'active',
      }));

      setListings(processedListings);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(`Failed to load your listings: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to update a listing's status (sold/unsold)
  const handleStatusUpdate = async (id, newStatus) => {
    const statusText = newStatus === 'active' ? 'unsold' : 'sold';
    const confirmMessage =
      newStatus === 'active'
        ? 'Are you sure you want to mark this listing as available again?'
        : 'Are you sure you want to mark this listing as sold? It will no longer appear in search results.';

    if (window.confirm(confirmMessage)) {
      try {
        setStatusLoading(id); // Set loading state for this specific item

        // Call the update endpoint to change the status
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND}/api/listings/${id}/status`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${await currentUser.getIdToken()}`, // Include auth token for verification
            },
          }
        );

        console.log('Status update response:', response.data);

        // Update the UI by changing the status of the listing
        setListings(
          listings.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );

        // Show success message
        alert(`Listing marked as ${statusText} successfully`);
      } catch (err) {
        console.error(`Error marking listing as ${statusText}:`, err);

        // Show appropriate error message based on the error
        if (err.response && err.response.status === 403) {
          alert("You don't have permission to update this listing.");
        } else if (err.response && err.response.status === 404) {
          alert('Listing not found.');
        } else {
          alert(`Failed to mark listing as ${statusText}: ${err.message}`);
        }
      } finally {
        setStatusLoading(null); // Clear loading state
      }
    }
  };

  // Updated handleDelete function to use the delete endpoint
  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this listing? This action cannot be undone.'
      )
    ) {
      try {
        setDeleteLoading(id); // Set loading state for this specific item

        // Call the delete endpoint
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND}/api/listings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${await currentUser.getIdToken()}`, // Include auth token for verification
            },
          }
        );

        console.log('Delete response:', response.data);

        // Update the UI by removing the deleted listing
        setListings(listings.filter((item) => item.id !== id));

        // Show success message (optional)
        alert('Listing deleted successfully');
      } catch (err) {
        console.error('Error deleting listing:', err);

        // Show appropriate error message based on the error
        if (err.response && err.response.status === 403) {
          alert("You don't have permission to delete this listing.");
        } else if (err.response && err.response.status === 404) {
          alert('Listing not found. It may have been already deleted.');
          // Still remove it from the UI if it's not found on the server
          setListings(listings.filter((item) => item.id !== id));
        } else {
          alert(`Failed to delete listing: ${err.message}`);
        }
      } finally {
        setDeleteLoading(null); // Clear loading state
      }
    }
  };

  // Handle edit listing - redirect to edit page
  const handleEdit = (item) => {
    navigate(`/editListing/${item.id}`, {
      state: {
        id: item.id,
        formData: item,
        files: item.picUrls.map((url) => ({ preview: url })),
      },
    });
  };

  // Handle adding a new listing
  const handleAddNew = () => {
    window.location.href = '/addlisting';
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '300px' }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Show error message if there was an error fetching data
  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={fetchMyListings}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">My Listings</h4>
        <Button variant="primary" size="sm" onClick={handleAddNew}>
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
            <Button
              variant="outline-primary"
              className="mt-3"
              onClick={handleAddNew}
            >
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
                      src={
                        item.picUrls && item.picUrls.length > 0
                          ? item.picUrls[0]
                          : 'https://via.placeholder.com/100'
                      }
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: '120px', objectFit: 'cover' }}
                    />
                    {/* Only show the "Sold" badge when status is inactive */}
                    {item.status === 'inactive' && (
                      <Badge
                        bg="secondary"
                        className="position-absolute top-0 start-0 m-2"
                      >
                        Sold
                      </Badge>
                    )}
                  </div>
                </Col>

                {/* Content Section */}
                <Col xs={8} md={9}>
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <Card.Title className="text-primary fw-bold mb-1 listing-title">
                          {item.title ? item.title.toUpperCase() : 'UNTITLED'}
                        </Card.Title>
                        <Card.Text className="mb-0 listing-price fs-5">
                          <strong>${item.price}</strong>
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
                          <Dropdown.Item onClick={() => handleEdit(item)}>
                            <i className="bi bi-pencil me-2"></i> Edit
                          </Dropdown.Item>
                          {item.status === 'active' ? (
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusUpdate(item.id, 'inactive')
                              }
                            >
                              <i className="bi bi-check-circle me-2"></i> Mark
                              as Sold
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusUpdate(item.id, 'active')
                              }
                            >
                              <i className="bi bi-arrow-counterclockwise me-2"></i>{' '}
                              Mark as Unsold
                            </Dropdown.Item>
                          )}
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
                      {item.description || 'No description available'}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex gap-3 text-muted small">
                        {item.category && (
                          <span>
                            <i className="bi bi-tag me-1"></i> {item.category}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="bi bi-pencil me-1"></i> Edit
                        </Button>

                        {/* Conditional Sold/Unsold Button */}
                        {item.status === 'active' ? (
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(item.id, 'inactive')
                            }
                            disabled={statusLoading === item.id}
                          >
                            {statusLoading === item.id ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="me-1"
                                />
                                Updating...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-1"></i> Mark
                                as Sold
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(item.id, 'active')
                            }
                            disabled={statusLoading === item.id}
                          >
                            {statusLoading === item.id ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="me-1"
                                />
                                Updating...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-arrow-counterclockwise me-1"></i>{' '}
                                Mark as Unsold
                              </>
                            )}
                          </Button>
                        )}

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleteLoading === item.id}
                        >
                          {deleteLoading === item.id ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-1"
                              />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-trash me-1"></i> Delete
                            </>
                          )}
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
