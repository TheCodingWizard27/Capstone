import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from '../Firebase/auth';
import { useAuth } from '../contexts/authContext';

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if user is already logged in
  if (userLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doSignInWithGoogle();
        navigate('/home');
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="p-3 shadow-lg">
            <Card.Body>
              <h5 className="text-center mb-2">Create your Account</h5>
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <Form onSubmit={onSubmit}>
                {/* Name field */}
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>
                    <h6>Name</h6>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isRegistering}
                  />
                </Form.Group>

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
                    disabled={isRegistering}
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
                    disabled={isRegistering}
                  />
                </Form.Group>

                {/* Re-enter Password field */}
                <Form.Group controlId="formReEnterPassword" className="mb-2">
                  <Form.Label>
                    <h6>Re-enter Password</h6>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isRegistering}
                  />
                </Form.Group>

                {/* Checkbox for Show/Hide Password */}
                <Form.Group controlId="formBasicCheckbox" className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={showPassword ? 'Hide Password' : 'Show Password'}
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                </Form.Group>

                {/* Create Account button */}
                <Button
                  variant="primary"
                  className="w-100 py-2 mb-2"
                  type="submit"
                  size="sm"
                  disabled={isRegistering}
                >
                  {isRegistering ? 'Creating Account...' : 'Create Account'}
                </Button>

                {/* Already a member text */}
                <div className="text-center mt-1">
                  <p>Already a member?</p>
                  <Link to="/signIn" className="w-100">
                    <Button
                      variant="dark"
                      className="w-100 py-2 mb-1"
                      size="sm"
                    >
                      Log In
                    </Button>
                  </Link>
                </div>

                {/* OR separator */}
                <div className="text-center mb-2">
                  <span className="text-muted">- OR -</span>
                </div>

                {/* Sign In with Google button */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2 py-2 d-flex align-items-center justify-content-center"
                  size="sm"
                  onClick={onGoogleSignIn}
                  disabled={isRegistering}
                >
                  <FaGoogle className="me-3" />
                  Google
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
