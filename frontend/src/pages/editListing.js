import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateListing } from '../api/listing';
import { useAuth } from '../contexts/authContext';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import NavBar from '../components/navBar';
import axios from 'axios';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState(location.state?.formData || {});
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(
    location.state?.files || []
  );
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from context or localStorage
    const authToken = token || localStorage.getItem('token');

    if (!id) {
      setAlert({
        show: true,
        message: 'Error: Invalid listing ID.',
        variant: 'danger',
      });
      return;
    }

    if (!authToken) {
      setAlert({
        show: true,
        message: 'Authentication error. Please log in again.',
        variant: 'danger',
      });
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.set('title', formData.title || '');
      formDataObj.set('brand', formData.brand || '');
      formDataObj.set('category', formData.category || '');
      formDataObj.set('price', formData.price || '');
      formDataObj.set('description', formData.description || '');

      existingImages.forEach((url) => {
        formDataObj.append('picUrls', url);
      });

      files.forEach((fileObj) => {
        if (fileObj.file) {
          formDataObj.append('files', fileObj.file);
        }
      });

      console.log('Submitting token:', authToken);

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/updateListing/${id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setAlert({
        show: true,
        message: 'Listing updated successfully!',
        variant: 'success',
      });
      setTimeout(() => navigate(`/singleListing/${id}`), 3000);
    } catch (error) {
      console.error('Error updating listing:', error);
      setAlert({
        show: true,
        message: 'Error updating listing.',
        variant: 'danger',
      });
    }
  };

  return (
    <>
      <NavBar />
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Card
          className="p-4 shadow-lg"
          style={{ width: '100%', maxWidth: '800px' }}
        >
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            {['title', 'brand', 'category', 'price', 'description'].map(
              (field) => (
                <Form.Group controlId={field} key={field} className="mb-3">
                  <Form.Label>
                    <h5>{field.charAt(0).toUpperCase() + field.slice(1)}</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              )
            )}
            <Form.Group className="mb-3">
              <h5>Existing Images</h5>
              <div className="d-flex flex-wrap">
                {existingImages.map((file, index) => (
                  <Card key={index} className="m-2" style={{ width: '120px' }}>
                    <Card.Img variant="top" src={file.preview} alt="Listing" />
                  </Card>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <h5>Upload New Images</h5>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default EditListing;
