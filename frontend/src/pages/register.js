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

        const response = await doCreateUserWithEmailAndPassword(
          email,
          password
        );

        console.log(response.user.email);
        console.log(response.user.uid)
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
      className="vh-auto d-flex align-items-center justify-content-center mb-5 mt-5"
      style={{ width: '100%' }}
    >
      <Row style={{ minWidth: '40%' }}>
        <Col className="d-flex align-items-center justify-content-center h-auto">
          <Card
            style={{ width: '100%', minWidth: '300px', maxWidth: '1000px' }}
            className="p-3 shadow-lg h-100"
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <h5 className="text-center mb-4">Create your Account</h5>
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <Form className="w-100" onSubmit={onSubmit}>
                {/* Email field */}
                <Form.Group controlId="formEmail" className="mb-4">
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
                <Form.Group controlId="formPassword" className="mb-4">
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
                <Form.Group controlId="formReEnterPassword" className="mb-4">
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
                  className="w-100 py-3 mb-3"
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
                      className="w-100 py-3 mb-3"
                      size="sm"
                    >
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
