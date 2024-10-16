import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const SignInForm = () => {
    return (
      <Form className="w-100">
        {/* Email field */}
        <Form.Group controlId="formEmail" className="mb-4">
          <Form.Label>
            <h3>Email</h3>
          </Form.Label>
          <Form.Control size="md" type="email" placeholder="Enter your Email" />
        </Form.Group>

        {/* Password field */}
        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>
            <h3>Password</h3>
          </Form.Label>
          <Form.Control
            size="md"
            type="password"
            placeholder="Enter your Password"
          />
        </Form.Group>

        {/* Sign In button */}
        <Button
          variant="primary"
          className="w-100 py-3 mb-3"
          type="submit"
          size="lg"
        >
          Sign in
        </Button>

        {/* Sign In with Google button */}
        <Button
          variant="outline-secondary"
          className="w-100 mt-3 py-3 d-flex align-items-center justify-content-center"
          size="lg"
        >
          <FaGoogle className="me-3" /> {/* Google Icon */}
          Google
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
        <Link to="/register" className="w-100">
          <Button variant="dark" className="w-100 py-3 mt-2" size="lg">
            Register
          </Button>
        </Link>
      </Form>
    );
  };
  return (
    <Container
      fluid
      className="vh-auto d-flex align-items-center justify-content-center mt-3"
    >
      <Row className="w-90 h-100">
        {/* Left side with large logo */}
        

        {/* Sign-in form on the right side */}
        <Col
          className="d-flex align-items-center justify-content-center h-auto"
        >
          <Card
            style={{ width: '100%', maxWidth: '1000px' }}
            className="p-5 shadow-lg h-100"
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Sign In</h2>
              <SignInForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
