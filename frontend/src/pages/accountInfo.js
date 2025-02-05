import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';
import NavBar from '../components/navBar';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    email: 'person@email.com',
    phone: '(XXX)-XXX-XXXX',
    oldPassword: '',
    newPassword: '',
    memberStatus: 'Mentee',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleMemberStatusChange = (value) => {
    setFormData((prev) => ({ ...prev, memberStatus: value }));
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
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f0f4ff' }}
    >
      <div className="d-flex w-75 shadow-lg rounded bg-white">
        {/* Sidebar */}
        <div
          className="p-4 d-flex flex-column align-items-start"
          style={{ width: '250px', backgroundColor: '#f8f9fa' }}
        >
          <h4 className="mb-4">Settings</h4>
          <div className="mb-3">
            <span className="text-muted">PROFILE</span>
          </div>
          <div className="fw-bold text-primary border-bottom pb-1">ACCOUNT</div>
        </div>

        {/* Account Details */}
        <div className="p-4 flex-grow-1">
          <h4 className="mb-4">Account Settings</h4>

          <Form onSubmit={handleSubmit}>
            {/* Email & Phone */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Password Fields */}
            <h5 className="mt-4">Change Password</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="oldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.oldPassword}
                    onChange={handleChange}
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="outline-primary" className="mb-4">
              Submit
            </Button>

            {/* Save Button */}
            <div className="text-end">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
    </>
  );
};

export default AccountSettings;
