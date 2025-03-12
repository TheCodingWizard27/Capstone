import { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  Nav,
  Alert,
} from 'react-bootstrap';
import NavBar from '../components/navBar';
import MyListings from '../components/mylistings';


const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profilePic, setProfilePic] = useState(null);
  const [editField, setEditField] = useState({
    email: false,
    phone: false,
    password: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

  const handleEditToggle = (field) => {
    setEditField((prev) => {
      const newState = { ...prev, [field]: !prev[field] };

      // If we're saving, simulate a successful save
      if (prev[field] && !newState[field]) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }

      return newState;
    });
  };

  return (
    <>
      <NavBar />
      <Container
        fluid
        className="py-4 px-3"
        style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}
      >
        {showSuccess && (
          <Alert
            variant="success"
            className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-sm"
            style={{ zIndex: 1050, maxWidth: '90%', width: '400px' }}
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Changes saved successfully!
          </Alert>
        )}

        <Card
          className="mx-auto shadow border-0 overflow-hidden"
          style={{ maxWidth: '1000px', borderRadius: '12px' }}
        >
          <Card.Header className="bg-primary text-white py-3">
            <h3 className="mb-0">Account Settings</h3>
          </Card.Header>

          <Row className="g-0">
            {/* Left Side Menu */}
            <Col xs={12} md={3} className="border-end">
              {/* Desktop Profile Picture Section */}
              <div className="d-none d-md-block text-center p-3">
                <div
                  className="rounded-circle overflow-hidden shadow mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#e9ecef',
                    border: '3px solid #fff',
                  }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic || '/placeholder.svg'}
                      alt="Profile"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <i
                      className="bi bi-person-fill"
                      style={{ fontSize: '3rem', color: '#6c757d' }}
                    ></i>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-pic-upload-sidebar"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    document
                      .getElementById('profile-pic-upload-sidebar')
                      .click()
                  }
                  className="mb-2"
                >
                  <i className="bi bi-camera me-1"></i> Update a photo
                </Button>
                {profilePic && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setProfilePic(null)}
                    className="w-75"
                  >
                    <i className="bi bi-trash me-1"></i> Remove photo
                  </Button>
                )}
              </div>

              {/* Mobile Profile Picture Section */}
              <div className="d-md-none text-center p-3">
                <div
                  className="rounded-circle overflow-hidden shadow mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#e9ecef',
                    border: '3px solid #fff',
                  }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic || '/placeholder.svg'}
                      alt="Profile"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <i
                      className="bi bi-person-fill"
                      style={{ fontSize: '3rem', color: '#6c757d' }}
                    ></i>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-pic-upload-mobile"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    document.getElementById('profile-pic-upload-mobile').click()
                  }
                  className="mb-2"
                >
                  <i className="bi bi-camera me-1"></i> Change Photo
                </Button>
                {profilePic && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setProfilePic(null)}
                    className="w-75"
                  >
                    <i className="bi bi-trash me-1"></i> Remove Photo
                  </Button>
                )}
              </div>
              <Nav className="flex-column p-3 border-top" variant="pills">
                <Nav.Link
                  active={activeSection === 'profile'}
                  onClick={() => setActiveSection('profile')}
                  className="mb-2 d-flex align-items-center"
                >
                  <i className="bi bi-person-circle me-2"></i> Profile
                </Nav.Link>
                <Nav.Link
                  active={activeSection === 'listings'}
                  onClick={() => setActiveSection('listings')}
                  className="mb-2 d-flex align-items-center"
                >
                  <i className="bi bi-list-ul me-2"></i> My Listings
                </Nav.Link>
              </Nav>
            </Col>

            {/* Dynamic Content Area */}
            <Col xs={12} md={9} className="p-4">
              {activeSection === 'profile' && (
                <>
                  <h4 className="mb-4 border-bottom pb-2">
                    Personal Information
                  </h4>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={12}>
                        <Form.Group controlId="name" className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="shadow-sm"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group controlId="bio" className="mb-3">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={3}
                            className="shadow-sm"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h4 className="mt-4 mb-3 border-bottom pb-2">
                      Contact Information
                    </h4>

                    {/* Email Field with Edit Button */}
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <InputGroup className="shadow-sm">
                        <InputGroup.Text>
                          <i className="bi bi-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          disabled={!editField.email}
                        />
                        <Button
                          variant={
                            editField.email ? 'success' : 'outline-primary'
                          }
                          onClick={() => handleEditToggle('email')}
                        >
                          {editField.email ? (
                            <>
                              <i className="bi bi-check2"></i> Save
                            </>
                          ) : (
                            <>
                              <i className="bi bi-pencil"></i> Edit
                            </>
                          )}
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    {/* Phone Number Field with Edit Button */}
                    <Form.Group controlId="phone" className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <InputGroup className="shadow-sm">
                        <InputGroup.Text>
                          <i className="bi bi-telephone"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(XXX)-XXX-XXXX"
                          disabled={!editField.phone}
                        />
                        <Button
                          variant={
                            editField.phone ? 'success' : 'outline-primary'
                          }
                          onClick={() => handleEditToggle('phone')}
                        >
                          {editField.phone ? (
                            <>
                              <i className="bi bi-check2"></i> Save
                            </>
                          ) : (
                            <>
                              <i className="bi bi-pencil"></i> Edit
                            </>
                          )}
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    {/* Change Password Section */}
                    <Card
                      className="mt-4 mb-4 shadow-sm border-0"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Password Settings</h5>
                          <Button
                            variant={
                              editField.password ? 'success' : 'outline-primary'
                            }
                            size="sm"
                            onClick={() => handleEditToggle('password')}
                          >
                            {editField.password ? (
                              <>
                                <i className="bi bi-check2"></i> Save Password
                              </>
                            ) : (
                              <>
                                <i className="bi bi-lock"></i> Change Password
                              </>
                            )}
                          </Button>
                        </div>

                        {editField.password && (
                          <>
                            <Form.Group
                              controlId="oldPassword"
                              className="mb-3"
                            >
                              <Form.Label>Current Password</Form.Label>
                              <Form.Control
                                type="password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder="Enter current password"
                              />
                            </Form.Group>

                            <Form.Group
                              controlId="newPassword"
                              className="mb-3"
                            >
                              <Form.Label>New Password</Form.Label>
                              <Form.Control
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                              />
                            </Form.Group>
                          </>
                        )}
                      </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-end mt-4">
                      <Button variant="outline-secondary" className="me-2">
                        Cancel
                      </Button>
                      <Button variant="primary" type="submit">
                        <i className="bi bi-save me-1"></i> Save All Changes
                      </Button>
                    </div>
                  </Form>
                </>
              )}
              {activeSection === 'listings' && <MyListings />}
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default AccountSettings;
