import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const AddListing = () => {
  return (
    <Container fluid className="h-auto w-100vw mt-5">
      <Card style={{ width: '100%' }} className="p-4 shadow-lg h-1000">
        <Form className="flex-grow-1">
          {/* Start your listing field*/}
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

          {/* Description field */}
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>
              <h3>Description (Maximum Word Limit: 500)</h3>
            </Form.Label>
            <Form.Control
              size="sm"
              as="textarea"
              rows={10}
              placeholder="Write a description for your item"
            />
          </Form.Group>

          {/* Brand field */}
          <Form.Group controlId="formMedia" className="mb-3">
            <Form.Label>
              <h3>Media</h3>
            </Form.Label>
            <Form.Control size="sm" type="file" placeholder="Upload media" />
          </Form.Group>

          {/* Sign In button */}
          <Button
            variant="primary"
            className="w-100 py-3 mb-3"
            type="submit"
            size="sm"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddListing;
