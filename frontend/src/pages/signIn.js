import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center mt-3">
      <Row className="w-100 h-100">
        {/* Left side with large logo */}
        <Col md={5} className="d-none d-md-flex align-items-center justify-content-center bg-light h-100">
        <Image
        src={`${process.env.PUBLIC_URL}/images/logo.svg`}
        alt="Logo"
        fluid
      />
        </Col>

        {/* Sign-in form on the right side */}
        <Col md={7} className="d-flex align-items-center justify-content-center h-1000">
          <Card style={{ width: '100%', maxWidth: '1000px' }} className="p-5 shadow-lg h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-5">Sign In</h2>

              <Form className="flex-grow-1">
                {/* Email field */}
                <Form.Group controlId="formEmail" className="mb-5">
                  <Form.Label><h4>Email</h4></Form.Label>
                  <Form.Control size="lg" type="email" placeholder="Enter your Email" />
                </Form.Group>

                {/* Password field */}
                <Form.Group controlId="formPassword" className="mb-5">
                  <Form.Label><h4>Password</h4></Form.Label>
                  <Form.Control size="lg" type="password" placeholder="Enter your Password" />
                </Form.Group>

                {/* Sign In button */}
                <Button variant="primary" className="w-100 py-3 mb-3" type="submit" size="lg">
                  Sign in
                </Button>

                {/* Sign In with Google button */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3 py-3 d-flex align-items-center justify-content-center"
                  size="lg"
                >
                  <FaGoogle className="me-3" /> {/* Google Icon */}
                  Sign in with Google
                </Button>

                {/* OR separator */}
                <div className="text-center mt-4 mb-2">
                  <span className="text-muted">- OR -</span>
                </div>

                {/* Don't have an account text */}
                <div className="text-center mt-3">
                  <p>Don't have an account yet?</p>
                </div>

                {/* Register button wrapped in Link */}
                <Link to="/pages/register" className="w-100">
                  <Button variant="dark" className="w-100 py-3 mt-2" size="lg">
                    Register
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
