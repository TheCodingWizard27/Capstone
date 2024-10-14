import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        {/* Left side with large logo */}
        <Col md={5} className="d-none d-md-flex align-items-center justify-content-center bg-light">
          <img src="logo.svg" alt="Shop Simplify Logo" style={{ width: '75%', borderRadius: '50%' }} />
        </Col>

        {/* Registration form on the right side */}
        <Col md={7} className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '100%', maxWidth: '450px' }} className="p-4 shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Create your Free Account</h3>

              <Form>
                {/* Full Name field */}
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your Full Name here" />
                </Form.Group>

                {/* Email field */}
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your Email here" />
                </Form.Group>

                {/* Password field */}
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your Password here" />
                </Form.Group>

                {/* Re-enter Password field */}
                <Form.Group controlId="formReEnterPassword" className="mt-3">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-enter your Password here" />
                </Form.Group>

                {/* Create Account button */}
                <Button variant="primary" className="w-100 mt-4" type="submit">
                  Create Account
                </Button>

                {/* Already a member text */}
                <div className="text-center mt-3">
                  <p>Already a member?</p>
                  <Link to="/pages/signin">Log In</Link>
                </div>

                {/* OR separator */}
                <div className="text-center mt-4 mb-2">
                  <span className="text-muted">- OR -</span>
                </div>

                {/* Sign In with Google button */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2 d-flex align-items-center justify-content-center"
                >
                  <FaGoogle className="me-2" /> {/* Google Icon */}
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
