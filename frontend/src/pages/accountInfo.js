import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import NavBar from "../components/navBar";

const AccountSettings = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [formData, setFormData] = useState(accountInfo);

  const handleSave = () => {
    setAccountInfo(formData);
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
        <h2 className="mb-4">Account Information</h2>

        {/* Profile Image */}
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>Photo</span>
          )}
          {/* Edit Icon Overlay */}
          <button
            onClick={() => document.getElementById("profilePhotoInput").click()}
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
        <Form.Control
          type="file"
          id="profilePhotoInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Account Information */}
        <Form className="w-100">
          <Row className="mb-3">
            <Col>
              <h5>Name</h5>
              {(
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Name of the User"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>Email</h5>
              {(
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>Bio</h5>
              {(
                <Form.Control
                  id="bio"
                  type="text"
                  placeholder="A description of this user."
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              )}
            </Col>
          </Row>
          {(
            <div>
              <Button variant="primary" className="me-2" onClick={handleSave}>
                Save
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
      {/* Delete Account and Log Out Buttons */}
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center gap-3">
          <Button
            variant="outline-danger"
            className="px-4"
            style={{
              border: "1px solid red",
              color: "red",
              backgroundColor: "transparent",
            }}
          >
            Delete Account
          </Button>
          <Button
            variant="success"
            className="px-4"
            style={{
              backgroundColor: "#005d8d",
              color: "white",
              border: "none",
            }}
          >
            Log Out
          </Button>
        </div>
      </Container>
    </>
  );
};

export default AccountSettings;
