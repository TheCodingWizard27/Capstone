import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';


const AddListing = () => {
  return (

    <Form className="flex-grow-1 mt-3">
                {/* Start your listing field*/}
                <Form.Group controlId="formListing" className="mb-5">
                  <Form.Label><h4>Start your Listing</h4></Form.Label>
                  <Form.Control size="lg" type="text" placeholder="Tell us what you're selling" />
                </Form.Group>

                {/* Brand field */}
                <Form.Group controlId="formBrand" className="mb-5">
                  <Form.Label><h4>Brand</h4></Form.Label>
                  <Form.Control size="lg" type="text" placeholder="Tell us the brand" />
                </Form.Group>

                {/* Category field */}
                <Form.Group controlId="formCategory" className="mb-5">
                  <Form.Label><h4>Category</h4></Form.Label>
                  <Form.Control size="lg" type="text" placeholder="Tell us the category" />
                </Form.Group>

                {/* Description field */}
                <Form.Group controlId="formDescription" className="mb-5">
                  <Form.Label><h4>Description (Maximum Word Limit: 500)</h4></Form.Label>
                  <Form.Control size="lg" type="textarea" rows={3} placeholder="Write a description for your item" />
                </Form.Group>

                {/* Brand field */}
                <Form.Group controlId="formMedia" className="mb-5">
                  <Form.Label><h4>Media</h4></Form.Label>
                  <Form.Control size="lg" type="file" placeholder="Upload media" />
                </Form.Group>

                {/* Sign In button */}
                <Button variant="primary" className="w-100 py-3 mb-3" type="submit" size="lg">
                  Submit
                </Button>
              </Form>

  );
}

export default AddListing;