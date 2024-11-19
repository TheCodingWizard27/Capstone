import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import NavBar from "../components/navBar";
import { FaEdit } from "react-icons/fa";

const AccountSettings = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    name: "Name of the User",
    email: "name@domain.com",
    bio: "A description of this user.",
  });

  const [formData, setFormData] = useState(accountInfo);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setAccountInfo(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(accountInfo);
    setEditMode(false);
  };

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

  return (
    <>
      <NavBar />
      <Container className="d-flex flex-column align-items-center mt-5" style={{ maxWidth: "600px" }}>
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

        {/* Account Information */}
        <Form className="w-100">
          <Row className="mb-3">
            <Col>
              <h5>Name</h5>
              {!editMode ? (
                <p>{accountInfo.name}</p>
              ) : (
                <Form.Control
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>Email</h5>
              {!editMode ? (
                <p>{accountInfo.email}</p>
              ) : (
                <Form.Control
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>Bio</h5>
              {!editMode ? (
                <p>{accountInfo.bio}</p>
              ) : (
                <Form.Control
                  id="bio"
                  type="text"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              )}
            </Col>
          </Row>
          {!editMode ? (
            <Button variant="outline-primary" onClick={handleEditClick}>
              EDIT
            </Button>
          ) : (
            <div>
              <Button variant="primary" className="me-2" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
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
