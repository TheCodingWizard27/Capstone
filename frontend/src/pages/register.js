import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 h-100">
        {/* Left side with large logo */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center bg-light h-100">
        <Image
        src={`${process.env.PUBLIC_URL}/images/logo.svg`}
        alt="Logo"
        fluid
      />
        </Col>

        {/* Sign-in form on the right side */}
        <Col md={6} className="d-flex align-items-center justify-content-center h-1000">
          <Card style={{ width: '100%', maxWidth: '1000px' }} className="p-5 shadow-lg h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-5">Create your Account</h2>

              <Form>
                {/* Full Name field */}
                <Form.Group controlId="formFullName" className="mb-5">
                  <Form.Label><h4>Full Name</h4></Form.Label>
                  <Form.Control size="lg" type="text" placeholder="Enter your Full Name" />
                </Form.Group>

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

                {/* Re-enter Password field */}
                <Form.Group controlId="formReEnterPassword" className="mb-5">
                  <Form.Label><h4>Re-enter Password</h4></Form.Label>
                  <Form.Control size="lg" type="password" placeholder="Re-enter your Password" />
                </Form.Group>

                {/* Create Account button */}
                <Button variant="primary" className="w-100 py-3 mb-3" type="submit" size="lg">
                  Create Account
                </Button>

                {/* Already a member text */}
                <div className="text-center mt-1">
                  <p>Already a member?</p>
                  <Link to="/pages/signIn" className="w-100">
                    <Button variant="dark" className="w-100 py-3 mb-3" size="lg">
                        Log In
                    </Button>
                  </Link>
                </div>

                {/* OR separator */}
                <div className="text-center mb-3">
                  <span className="text-muted">- OR -</span>
                </div>

                {/* Sign In with Google button */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3 py-3 d-flex align-items-center justify-content-center"
                  size="lg"
                >
                  <FaGoogle className="me-3" /> {/* Google Icon */}
                  Sign in with Google
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
