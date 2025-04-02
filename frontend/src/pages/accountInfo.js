import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col, Card, InputGroup, Nav, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/authContext';
import MyListings from '../components/mylistings';

import NavBar from '../components/navBar';
function AccountSettings() {


  const [activeSection, setActiveSection] = useState("profile")
  const [profilePic, setProfilePic] = useState(null)
  const [editField, setEditField] = useState({
    email: false,
    phone: false,
    password: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)
  const { currentUser } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    oldPassword: "",
    newPassword: "",
  })



  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
        credentials: "include", // Include cookies for auth
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user information")
      }

      const userData = await response.json()

      // Update form data with user information
      setFormData({
        name: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phoneNumber || "",
        bio: userData.bio || "",
        oldPassword: "",
        newPassword: "",
      })

      // Set profile picture if available
      if (userData.photoURL) {
        setProfilePic(userData.photoURL)
      }
    } catch (error) {
      console.error("Error fetching user info:", error)
      showErrorMessage("Could not load your profile information. Please try again later.")
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store the file for upload and create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        // Store both the file and the preview URL
        setProfilePic({
          file: file,
          preview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Create FormData for multipart/form-data (required for file upload)
      const formDataToSend = new FormData()
      formDataToSend.append("fullName", formData.name)
      formDataToSend.append("bio", formData.bio)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phoneNumber", formData.phone)

      // Add the photo file if it exists
      if (profilePic && profilePic.file) {
        formDataToSend.append("photo", profilePic.file)
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/updateUserInfo`, {
        method: "PUT",
        headers: {
          // Remove Content-Type header to let the browser set it with the boundary parameter
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
        credentials: "include", // Include cookies for auth
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to update user information")
      }

      showSuccessMessage()
      // Refresh user info to get the updated photo URL
      fetchUserInfo()
    } catch (error) {
      console.error("Error updating user info:", error)
      showErrorMessage("Failed to save changes. Please try again.")
    }
  }

  const handlePasswordChange = async () => {
    if (!formData.newPassword) {
      showErrorMessage("Please enter a new password")
      return
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/changePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
        credentials: "include", // Include cookies for auth
        body: JSON.stringify({
          newPassword: formData.newPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to change password")
      }

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }))

      // Close password edit mode
      setEditField((prev) => ({
        ...prev,
        password: false,
      }))

      showSuccessMessage("Password updated successfully!")
    } catch (error) {
      console.error("Error changing password:", error)
      showErrorMessage(error.message || "Failed to change password. Please try again.")
    }
  }

  const handleEditToggle = (field) => {
    setEditField((prev) => {
      const newState = { ...prev, [field]: !prev[field] }

      // If we're saving email or phone
      if (prev[field] && !newState[field] && (field === "email" || field === "phone")) {
        handleSubmit({ preventDefault: () => { } })
      }

      // If we're saving password
      if (prev[field] && !newState[field] && field === "password") {
        handlePasswordChange()
      }

      return newState
    })
  }

  const showSuccessMessage = (message = "Changes saved successfully!") => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setShowError(true)
    setTimeout(() => setShowError(false), 5000)
  }
  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserInfo()
  }, [])
  return (
    <>
      <NavBar />
      <Container fluid className="py-4 px-3" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        {showSuccess && (
          <Alert
            variant="success"
            className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-sm"
            style={{ zIndex: 1050, maxWidth: "90%", width: "400px" }}
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Changes saved successfully!
          </Alert>
        )}

        {showError && (
          <Alert
            variant="danger"
            className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-sm"
            style={{ zIndex: 1050, maxWidth: "90%", width: "400px" }}
            onClose={() => setShowError(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}

        <Card className="mx-auto shadow border-0 overflow-hidden" style={{ maxWidth: "1000px", borderRadius: "12px" }}>
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
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#e9ecef",
                    border: "3px solid #fff",
                  }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic.preview || profilePic}
                      alt="Profile"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <i className="bi bi-person-fill" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-pic-upload-sidebar"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => document.getElementById("profile-pic-upload-sidebar").click()}
                  className="mb-2"
                >
                  <i className="bi bi-camera me-1"></i> Change photo
                </Button>
                {profilePic && (
                  <Button variant="outline-danger" size="sm" onClick={() => setProfilePic(null)} className="w-75">
                    <i className="bi bi-trash me-1"></i> Remove photo
                  </Button>
                )}
              </div>
              {/* Mobile Profile Picture Section */}
              <div className="d-md-none text-center p-3">
                <div
                  className="rounded-circle overflow-hidden shadow mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#e9ecef",
                    border: "3px solid #fff",
                  }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic.preview || profilePic}
                      alt="Profile"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <i className="bi bi-person-fill" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-pic-upload-mobile"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => document.getElementById("profile-pic-upload-mobile").click()}
                  className="mb-2"
                >
                  <i className="bi bi-camera me-1"></i> Change Photo
                </Button>
                {profilePic && (
                  <Button variant="outline-danger" size="sm" onClick={() => setProfilePic(null)} className="w-75">
                    <i className="bi bi-trash me-1"></i> Remove Photo
                  </Button>
                )}
              </div>
              <Nav className="flex-column p-3 border-top" variant="pills">
                <Nav.Link
                  active={activeSection === "profile"}
                  onClick={() => setActiveSection("profile")}
                  className="app mb-2 d-flex align-items-center"
                >
                  <i className="bi bi-person-circle me-2"></i> Profile
                </Nav.Link>
                <Nav.Link
                  active={activeSection === "listings"}
                  onClick={() => setActiveSection("listings")}
                  className="app mb-2 d-flex align-items-center"
                >
                  <i className="bi bi-list-ul me-2"></i> My Listings
                </Nav.Link>
              </Nav>
            </Col>

            {/* Dynamic Content Area */}
            <Col xs={12} md={9} className="p-4">
              {activeSection === "profile" && (
                <>
                  <h4 className="mb-4 border-bottom pb-2">Personal Information</h4>
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

                    <h4 className="mt-4 mb-3 border-bottom pb-2">Contact Information</h4>

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
                          variant={editField.email ? "success" : "outline-primary"}
                          onClick={() => handleEditToggle("email")}
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
                          variant={editField.phone ? "success" : "outline-primary"}
                          onClick={() => handleEditToggle("phone")}
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
                    <Card className="mt-4 mb-4 shadow-sm border-0" style={{ backgroundColor: "#f8f9fa" }}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Password Settings</h5>
                          <Button
                            variant={editField.password ? "success" : "outline-primary"}
                            size="sm"
                            onClick={() => handleEditToggle("password")}
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
                            <Form.Group controlId="oldPassword" className="mb-3">
                              <Form.Label>Current Password</Form.Label>
                              <Form.Control
                                type="password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder="Enter current password"
                              />
                            </Form.Group>

                            <Form.Group controlId="newPassword" className="mb-3">
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
                      <Button variant="outline-secondary" className="me-2" onClick={() => fetchUserInfo()}>
                        Cancel
                      </Button>
                      <Button variant="primary" type="submit">
                        <i className="bi bi-save me-1"></i> Save All Changes
                      </Button>
                    </div>
                  </Form>
                </>
              )}
              {activeSection === "listings" && <MyListings />}
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  )
}

export default AccountSettings


