import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
} from 'react-bootstrap';
import NavBar from '../components/navBar';

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profilePic, setProfilePic] = useState(null);
  const [editField, setEditField] = useState({
    email: false,
    phone: false,
    password: false,
  });

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
            {/* Left Side Menu */}
            <Col md={3} className="fw-bold text-primary">
              <h4 className="mb-4">Profile</h4>
              <div
                className={`fw-bold text-primary border-bottom pb-4 ${
                  activeSection === 'profile' ? 'text-dark' : ''
                }`}
                onClick={() => setActiveSection('profile')}
                style={{ cursor: 'pointer' }}
              >
                Profile
              </div>
              <div
                className={`fw-bold text-primary border-bottom pb-4 ${
                  activeSection === 'listings' ? 'text-dark' : ''
                }`}
                onClick={() => setActiveSection('listings')}
                style={{ cursor: 'pointer' }}
              >
                My Listings
              </div>
              <div
                className={`fw-bold text-primary border-bottom pb-4 ${
                  activeSection === 'wishlist' ? 'text-dark' : ''
                }`}
                onClick={() => setActiveSection('wishlist')}
                style={{ cursor: 'pointer' }}
              >
                Wishlist
              </div>
            </Col>

            {/* Dynamic Content Area */}
            <Col md={6}>
              {activeSection === 'profile' && (
                <>
                  <h4 className="mb-4">Profile</h4>
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

                    {/* Email Field with Edit Button */}
                    <Row className="mb-4">
                      <Col md={12}>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="example@email.com"
                              disabled={!editField.email}
                            />
                            <Button
                              variant="outline-primary"
                              onClick={() =>
                                setEditField((prev) => ({
                                  ...prev,
                                  email: !prev.email,
                                }))
                              }
                            >
                              {editField.email ? 'Save' : 'Edit'}
                            </Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Phone Number Field with Edit Button */}
                    <Row className="mb-4">
                      <Col md={12}>
                        <Form.Group controlId="phone">
                          <Form.Label>Phone Number</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(XXX)-XXX-XXXX"
                              disabled={!editField.phone}
                            />
                            <Button
                              variant="outline-primary"
                              onClick={() =>
                                setEditField((prev) => ({
                                  ...prev,
                                  phone: !prev.phone,
                                }))
                              }
                            >
                              {editField.phone ? 'Save' : 'Edit'}
                            </Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Change Password Section */}
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
                            disabled={!editField.password}
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
                            disabled={!editField.password}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        setEditField((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {editField.password ? 'Save Password' : 'Change Password'}
                    </Button>

                    <div className="mt-4">
                      <Button variant="outline-primary" className="me-3">
                        Submit
                      </Button>
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  </Form>
                </>
              )}

              {activeSection === 'listings' && (
                <div>
                  <h4>My Listings</h4>
                  <p>Here you can manage your product listings.</p>
                </div>
              )}

              {activeSection === 'wishlist' && (
                <div>
                  <h4>Wishlist</h4>
                  <p>Here you can view and manage your wishlist.</p>
                </div>
              )}
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
                    width: '150px',
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
