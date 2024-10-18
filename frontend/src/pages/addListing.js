import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import NavBar from '../components/navBar';

const AddListing = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filePreviews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...filePreviews]);
  };

  // Handle file removal
  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  // Handle description change with word limit
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean); // Split text into words
    if (words.length <= 250) {
      setDescription(text); // Update description if under word limit
      setWordCount(words.length); // Update word count
    }
  };

  return (
    <>
      <NavBar />
      <Container fluid className="h-auto mt-5 mb-5">
        <Card style={{ width: '100%' }} className="p-4 shadow-lg h-1000">
          <Form className="flex-grow-1">
            {/* Start your listing field */}
            <Form.Group controlId="formListing" className="mb-3">
              <Form.Label>
                <h3>Start your Listing</h3>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Tell us what you're selling"
              />
            </Form.Group>

            {/* Brand field */}
            <Form.Group controlId="formBrand" className="mb-3">
              <Form.Label>
                <h3>Brand</h3>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Tell us the brand"
              />
            </Form.Group>

            {/* Category field */}
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>
                <h3>Category</h3>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Tell us the category"
              />
            </Form.Group>

            {/* Description field with word count */}
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>
                <h3>Description</h3>
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

            {/* Media field */}
            <Form.Group controlId="formMedia" className="mb-3">
              <h3>Media</h3>

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
                onClick={() => document.getElementById('formMedia').click()} // Trigger the file input
              >
                Choose Files
              </Button>

              {/* Thumbnails display inside cards */}
              <div className="d-flex flex-wrap mt-3">
                {files.map((file, index) => (
                  <Card
                    key={index}
                    className="position-relative m-2"
                    style={{ width: '140px', height: '140px' }}
                  >
                    {/* Delete button positioned on the top-right */}
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

                    {/* Thumbnail image inside the card */}
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

            {/* Submit button */}
            <Button
              variant="primary"
              className="w-100 py-3 mb-3"
              type="submit"
              size="md"
            >
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default AddListing;
