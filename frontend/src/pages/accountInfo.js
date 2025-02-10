import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navBar';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Info:', formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NavBar />
      <Container
        fluid
        className="p-5"
        style={{ backgroundColor: '#f0f4ff', minHeight: '100vh' }}
      >
        <Card className="w-75 mx-auto p-4 shadow-lg rounded bg-white">
          <Row>
            {/* Left Side Menu - Increased Spacing */}
            <Col md={3} className="fw-bold text-primary">
              <h4 className="mb-4">Settings</h4>
              <div className="fw-bold text-primary border-bottom pb-4">
                Profile
              </div>
              <div
                className="fw-bold text-primary border-bottom pb-4"
                onClick={() => navigate('/account')}
                style={{ cursor: 'pointer' }}
              >
                Account
              </div>
              <div
                className="fw-bold text-primary border-bottom pb-4"
                onClick={() => navigate('/my-listings')}
                style={{ cursor: 'pointer' }}
              >
                My Listings
              </div>
              <div
                className="fw-bold text-primary border-bottom pb-4"
                onClick={() => navigate('/wishlist')}
                style={{ cursor: 'pointer' }}
              >
                Wishlist
              </div>
            </Col>

            {/* Main Account Settings Form */}
            <Col md={6}>
              <h4 className="mb-4">Account Settings</h4>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="bio">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us a little about yourself"
                        rows={4}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(XXX)-XXX-XXXX"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h4 className="mt-4">Change Password</h4>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group controlId="oldPassword">
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter old password"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="newPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="outline-primary" className="me-3">
                  Submit
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Col>

            {/* Profile Picture Section */}
            <Col md={3} className="d-flex flex-column align-items-center">
              <h5 className="mb-3">Profile Picture</h5>
              <label
                htmlFor="profile-pic-upload"
                className="position-relative d-flex flex-column align-items-center"
              >
                <div
                  className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: '150px', // Kept Bigger
                    height: '150px',
                    backgroundColor: '#222',
                    position: 'relative',
                  }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ color: 'white', fontSize: '14px' }}>
                      No Image
                    </div>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profile-pic-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <Button
                variant="outline-primary"
                className="mt-2"
                onClick={() =>
                  document.getElementById('profile-pic-upload').click()
                }
              >
                Edit
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default AccountSettings;
