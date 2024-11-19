import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import NavBar from '../components/navBar';
import { FaEdit } from 'react-icons/fa'; // Import edit icon

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    creditCardInfo: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    document.getElementById('profilePhotoInput').click(); // Opens file input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <NavBar />
      <Container fluid className="d-flex flex-column align-items-center mt-5 mb-5" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4">Account Information</h2>
        
        {/* Profile Picture Circle with Edit Icon */}
        <div
          style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>Photo</span>
          )}

          {/* Edit Icon Overlay */}
          <button
            onClick={handleEditClick}
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '10px',
              backgroundColor: 'rgb(0, 0, 0)',
              border: 'none',
              borderRadius: '50%',
              padding: '5px',
              cursor: 'pointer',
            }}
          >
            <FaEdit color="white" />
          </button>
        </div>

        {/* Hidden File Input */}
        <Form.Control
          type="file"
          id="profilePhotoInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />

        <Form onSubmit={handleSubmit} className="w-100">
          {/* Name Fields */}
          <Row className="mb-3">
            <Col>
              <Form.Control
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          {/* Password Change */}
          <h5>Change Password</h5>
          <Form.Group className="mb-3">
            <Form.Control
              id="oldPassword"
              type="password"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Form.Control
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Form.Control
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-4 w-100">
            Change Password
          </Button>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
        {/* My Listings */}
        <h4 className="mt-5">My Listings</h4>
        <div className="d-flex flex-wrap">
          {[0, 1, 2, 3, 4].map((listing) => (
            <div
              key={listing}
              style={{
                width: "100px",
                height: "100px",
                margin: "5px",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
              }}
            >
              Listing {listing}
            </div>
          ))}
        </div>

      </Container>
    </>
  );
};

export default AccountSettings;
