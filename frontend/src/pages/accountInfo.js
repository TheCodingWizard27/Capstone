import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa'; // Edit icon
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navBar';

const AccountSettings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    pronouns: "Don't specify",
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
            {/* Sidebar */}
            <Col md={3} className="border-end pe-4">
              <h4 className="mb-4">Settings</h4>
              <div className="fw-bold text-primary border-bottom pb-1">
                ACCOUNT
              </div>
            </Col>

            {/* Account Details */}
            <Col md={9}>
              <h4 className="mb-4">Account Settings</h4>

              {/* Profile Picture */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px' }}
                >
                  <FaRegEdit size={30} color="white" />
                </div>
                <Button variant="outline-primary" className="ms-3">
                  Edit
                </Button>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Name & Bio */}
                <Row className="mb-4">
                  <Col md={6}>
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
                  <Col md={6}>
                    <Form.Group controlId="bio">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us a little about yourself"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email & Phone */}
                <Row className="mb-4">
                  <Col md={6}>
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
                  <Col md={6}>
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

                {/* Pronouns */}
                <Form.Group controlId="pronouns" className="mb-4">
                  <Form.Label>Pronouns</Form.Label>
                  <Form.Select
                    value={formData.pronouns}
                    onChange={handleChange}
                  >
                    <option>Don't specify</option>
                    <option>He/Him</option>
                    <option>She/Her</option>
                    <option>They/Them</option>
                  </Form.Select>
                </Form.Group>

                {/* Password Fields */}
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
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default AccountSettings;
