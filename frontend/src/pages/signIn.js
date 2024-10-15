import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        {/* Left side with large logo */}
        <Col md={5} className="d-none d-md-flex align-items-center justify-content-center bg-light">
          <img src="logo.svg" alt="Shop Simplify Logo" style={{ width: '75%', borderRadius: '50%' }} />
        </Col>

        {/* Sign-in form on the right side */}
        <Col md={7} className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '100%', maxWidth: '450px' }} className="p-4 shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Sign In</h3>

              <Form>
                {/* Email field */}
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your Email here" />
                </Form.Group>

                {/* Password field */}
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your Password here" />
                </Form.Group>

                {/* Sign In button */}
                <Button variant="primary" className="w-100 mt-4" type="submit">
                  Sign in
                </Button>

                {/* Sign In with Google button */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2 d-flex align-items-center justify-content-center"
                >
                  <FaGoogle className="me-2" /> {/* Google Icon */}
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
                  <Button variant="dark" className="w-100 mt-2">
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
