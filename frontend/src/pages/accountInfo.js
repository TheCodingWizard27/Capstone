import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import NavBar from '../components/navBar';

const AccountSettings = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
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
    // Add API call or local storage saving logic
  };

  return (
    <>
      <NavBar />
      <Container
        fluid
        className="p-5"
        style={{ backgroundColor: '#f0f4ff', minHeight: '100vh' }}
      >
        <div className="d-flex w-75 mx-auto bg-white p-4 shadow-lg rounded">
          {/* Sidebar */}
          <div className="pe-5 border-end">
            <h4 className="mb-4">Settings</h4>

            {/* Current Page (Account) */}
            <div className="fw-bold text-primary border-bottom pb-1">
              ACCOUNT
            </div>
          </div>

          {/* Account Details */}
          <div className="ps-4 flex-grow-1">
            <h4 className="mb-4">Account Settings</h4>

            <Form onSubmit={handleSubmit}>
              {/* Email & Phone */}
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='example@email.com'
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
                      placeholder='(XXX)-XXX-XXXX'
                    />
                  </Form.Group>
                </Col>
              </Row>

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
                      placeholder='Enter old password'
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
                      placeholder='Enter new password'
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default AccountSettings;
