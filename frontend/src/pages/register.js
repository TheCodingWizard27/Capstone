import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../Firebase/auth';
import { useAuth } from '../contexts/authContext';

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Corrected naming
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect if user is already logged in
  if (userLoggedIn) {
    return <Navigate to={'/home'} replace={true} />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false); // Reset the registering state on error
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
      className="d-flex align-items-center justify-content-center mb-5 mt-5"
      style={{ width: '100%' }}
    >
      <Row className="w-100">
        <Col className="d-md-flex align-items-center justify-content-center h-auto">
          <Card
            style={{ width: '100%', maxWidth: '1000px' }}
            className="p-3 shadow-lg h-100"
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Create your Account</h2>
              {errorMessage && (
                <div className="alert alert-danger text-center">{errorMessage}</div>
              )}
              <Form onSubmit={onSubmit}>
                {/* Full Name field */}
                <Form.Group controlId="formFullName" className="mb-4">
                  <Form.Label>
                    <h3>Full Name</h3>
                  </Form.Label>
                  <Form.Control size="md" type="text" placeholder="Enter your Full Name" />
                </Form.Group>

                {/* Email field */}
                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label>
                    <h3>Email</h3>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isRegistering} // Disable during registration
                  />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isRegistering}
                  />
                </Form.Group>

                {/* Re-enter Password field */}
                <Form.Group controlId="formReEnterPassword" className="mb-4">
                  <Form.Label>
                    <h3>Re-enter Password</h3>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="password"
                    placeholder="Re-enter your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isRegistering}
                  />
                </Form.Group>

                {/* Create Account button */}
                <Button variant="primary" className="w-100 py-3 mb-3" type="submit" size="lg" disabled={isRegistering}>
                  {isRegistering ? 'Creating Account...' : 'Create Account'}
                </Button>

                {/* Already a member text */}
                <div className="text-center mt-1">
                  <p>Already a member?</p>
                  <Link to="/signIn" className="w-100">
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
