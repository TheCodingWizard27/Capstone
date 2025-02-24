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
        className="p-3"
        style={{ backgroundColor: '#f0f4ff', minHeight: '100vh' }}
      >
        <Card
          className="mx-auto p-3 shadow-lg rounded bg-white"
          style={{ maxWidth: '800px' }}
        >
          <Row>
            {/* Left Side Menu */}
            <Col xs={12} md={3} className="mb-4 mb-md-0">
              <h4 className="mb-3">Profile</h4>
              <div
                className={`fw-bold border-bottom pb-2 mb-2 ${
                  activeSection === 'profile' ? 'text-dark' : 'text-primary'
                }`}
                onClick={() => setActiveSection('profile')}
                style={{ cursor: 'pointer' }}
              >
                Profile
              </div>
              <div
                className={`fw-bold border-bottom pb-2 mb-2 ${
                  activeSection === 'listings' ? 'text-dark' : 'text-primary'
                }`}
                onClick={() => setActiveSection('listings')}
                style={{ cursor: 'pointer' }}
              >
                My Listings
              </div>
              <div
                className={`fw-bold border-bottom pb-2 mb-2 ${
                  activeSection === 'wishlist' ? 'text-dark' : 'text-primary'
                }`}
                onClick={() => setActiveSection('wishlist')}
                style={{ cursor: 'pointer' }}
              >
                Wishlist
              </div>
            </Col>

            {/* Dynamic Content Area */}
            <Col xs={12} md={6}>
              {activeSection === 'profile' && (
                <>
                  <h4 className="mb-3">Profile</h4>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                    </Form.Group>

                    <Form.Group controlId="bio" className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                        rows={3}
                      />
                    </Form.Group>

                    {/* Email Field with Edit Button */}
                    <Form.Group controlId="email" className="mb-3">
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

                    {/* Phone Number Field with Edit Button */}
                    <Form.Group controlId="phone" className="mb-3">
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

                    {/* Change Password Section */}
                    <h4 className="mt-4">Change Password</h4>
                    <Form.Group controlId="oldPassword" className="mb-3">
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter old password"
                        disabled={!editField.password}
                      />
                    </Form.Group>

                    <Form.Group controlId="newPassword" className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        disabled={!editField.password}
                      />
                    </Form.Group>

                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        setEditField((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                      className="mb-3"
                    >
                      {editField.password ? 'Save Password' : 'Change Password'}
                    </Button>

                    <div className="mt-3 d-flex flex-column flex-md-row">
                      <Button
                        variant="outline-primary"
                        className="mb-2 mb-md-0 me-md-3"
                      >
                        Submit
                      </Button>
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Col>

            {/* Profile Picture Section */}
            <Col xs={12} md={3} className="text-center mt-4 mt-md-0">
              <h5 className="mb-3">Profile Picture</h5>
              <div
                className="rounded-circle overflow-hidden shadow mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#222',
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
