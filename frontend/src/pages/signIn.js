import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa'; // Import only Google icon now
import { Link, useNavigate } from 'react-router-dom';

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from '../Firebase/auth';
import { useAuth } from '../contexts/authContext';

const SignIn = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const handleReset = () => {
    navigate('/forgotPassword');
  };

  if (userLoggedIn) {
    navigate('/home');
  }

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#005d8d' }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="p-3 shadow-lg">
            <Card.Body>
              <h5 className="text-center mb-4 mt-4">Sign In</h5>
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <Form onSubmit={onSubmit}>
                {/* Email field */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>
                    <h6>Email</h6>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSigningIn}
                  />
                </Form.Group>

                {/* Password field */}
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>
                    <h6>Password</h6>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSigningIn}
                  />
                </Form.Group>

                {/* Checkbox for Show/Hide Password */}
                <Form.Group controlId="formBasicCheckbox" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={showPassword ? 'Hide Password' : 'Show Password'}
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)} // Toggle showPassword state
                  />
                </Form.Group>

                {/* Forgot Password */}
                <div className="mt-3">
                  <p>
                    Forgot Password? Click{' '}
                    <span
                      style={{ cursor: 'pointer', color: '#005d8d' }}
                      onClick={handleReset}
                    >
                      <b>here</b>
                    </span>{' '}
                    to Reset
                  </p>
                </div>

                {/* Sign In button */}
                <Button
                  variant="primary"
                  className="w-100 py-2 mb-3 mt-3"
                  type="submit"
                  size="sm"
                  disabled={isSigningIn}
                >
                  Sign in
                </Button>

                {/* Sign In with Google button */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3 py-2 d-flex align-items-center justify-content-center"
                  size="sm"
                  onClick={onGoogleSignIn}
                  disabled={isSigningIn}
                >
                  <FaGoogle className="me-3" /> {/* Google Icon */}
                  Google
                </Button>

                {/* OR separator */}
                <div className="text-center mt-2 mb-2">
                  <span className="text-muted">- OR -</span>
                </div>

                {/* Don't have an account text */}
                <div className="text-center mt-2">
                  <p>Don't have an account yet?</p>
                </div>

                {/* Register button wrapped in Link */}
                <Link to="/register" className="w-100">
                  <Button variant="dark" className="w-100 py-2 mt-1" size="sm">
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
