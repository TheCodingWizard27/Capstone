import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  Button,
  Card,
  ProgressBar,
  Alert,
} from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import NavBar from '../components/navBar';
import axios from 'axios';
import { submitListing } from '../api/listing';
import { useAuth } from '../contexts/authContext';

const AddListing = () => {
  const [categories, setCategories] = useState([]);
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1); // Track current step
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({});
  const [description, setDescription] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: '',
    price: '',
  });
  const [errors, setErrors] = useState({}); // Track errors for required fields

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/categories`)
      .then((response) => {
        setCategories(response.data); // Set the categories from the response
      })
      .catch((err) => {
        setErrors(err.message); // Handle any errors
      });
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setAlert({
      show: false,
      message: '',
      variant: '',
    });
    const selectedFiles = Array.from(e.target.files);
    const filePreviews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...filePreviews]);
  };

  // Handle file removal
  const removeFile = (index) => {
    setAlert({
      show: false,
      message: '',
      variant: '',
    });
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setAlert({
      show: false,
      message: '',
      variant: '',
    });
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error if any
  };

  // Handle description change with word limit
  const handleDescriptionChange = (e) => {
    setAlert({
      show: false,
      message: '',
      variant: '',
    });
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 250) {
      setDescription(text);
      setWordCount(words.length);
    }
  };

  // Validate required fields
  const validateFields = () => {
    const newErrors = {};
    if (!formData.listing) newErrors.listing = 'Listing is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields correctly.',
        variant: 'danger',
      });
      return;
    }
    try {
      // Combine all form data and files
      const data = { ...formData, description, files };
      await submitListing(data, currentUser.accessToken);
      setStep(1);
      setFormData({
        listing: '',
        brand: '',
        category: '',
        price: '',
      });
      setDescription('');
      setFiles([]);
      setAlert({
        show: true,
        message: 'Listing submitted successfully!',
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        'An error occurred.';
      setAlert({
        show: true,
        message: errorMessage, // Ensure it's a string
        variant: 'danger',
      });
      console.error('Error submitting listing:', error);
    }
  };

  // Navigate to next step with validation
  const nextStep = () => {
    if (step === 1 && !validateFields()) return;
    setStep((prevStep) => prevStep + 1);
  };

  // Navigate to previous step
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex justify-content-center h-auto mt-5 mb-5"
      >
        <Card
          className="p-4 shadow-lg"
          style={{ width: '100%', minWidth: '300px', maxWidth: '1000px' }}
        >
          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert({ show: false })}
              dismissible
            >
              {alert.message}
            </Alert>
          )}
          <ProgressBar
            now={(step / 3) * 100}
            label={`Step ${step} of 3`}
            className="mb-4"
          />
          <Form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                <Form.Group controlId="listing" className="mb-3">
                  <Form.Label>
                    <h5>Start your Listing</h5>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="Tell us what you're selling"
                    value={formData.listing}
                    onChange={handleInputChange}
                    isInvalid={errors.listing}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.listing}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="brand" className="mb-3">
                  <Form.Label>
                    <h5>Brand</h5>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="Tell us the brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    isInvalid={errors.brand}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brand}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="category" className="mb-3">
                  <Form.Label>
                    <h5>Category</h5>
                  </Form.Label>
                  <Form.Select
                    size="md"
                    value={formData.category}
                    onChange={handleInputChange}
                    isInvalid={errors.category}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                  <Form.Label>
                    <h5>Price</h5>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    isInvalid={errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* // */}

                <Button variant="primary" className="mt-3" onClick={nextStep}>
                  Next
                </Button>
              </>
            )}

            {/* Step 2: Description */}
            {step === 2 && (
              <>
                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>
                    <h5>Description</h5>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    as="textarea"
                    rows={10}
                    placeholder="Write a description for your item"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <div>Word Count: {wordCount}/250</div>
                </Form.Group>

                <Button
                  variant="secondary"
                  className="mt-3 me-2"
                  onClick={prevStep}
                >
                  Previous
                </Button>
                <Button variant="primary" className="mt-3" onClick={nextStep}>
                  Next
                </Button>
              </>
            )}

            {/* Step 3: Media Upload */}
            {step === 3 && (
              <>
                <Form.Group controlId="formMedia" className="mb-3">
                  <h5>Media</h5>

                  <Form.Control
                    size="md"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                  />
                  <Button
                    style={{ backgroundColor: '#0f9e48' }}
                    size="sm"
                    onClick={() => document.getElementById('formMedia').click()}
                  >
                    Choose Files
                  </Button>

                  <div className="d-flex flex-wrap mt-3">
                    {files.map((file, index) => (
                      <Card
                        key={index}
                        className="position-relative m-2"
                        style={{ width: '140px', height: '140px' }}
                      >
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 start-100 translate-middle"
                          onClick={() => removeFile(index)}
                          style={{
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FaTimes size={12} />
                        </Button>
                        <Card.Img
                          variant="top"
                          src={file.preview}
                          alt="thumbnail"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Card>
                    ))}
                  </div>
                </Form.Group>

                <Button
                  variant="secondary"
                  className="mt-3 me-2"
                  onClick={prevStep}
                >
                  Previous
                </Button>
                <Button variant="primary" className="mt-3" type="submit">
                  Submit
                </Button>
              </>
            )}
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default AddListing;
