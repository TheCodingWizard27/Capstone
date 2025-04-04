import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSigningIn(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      setIsSigningIn(false);

      // Display the success message for 5 seconds and then redirect to the sign-in page
      setTimeout(() => {
        navigate('/signIn');
      }, 5000);
    } catch (error) {
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-auto d-flex align-items-center justify-content-center mb-5 mt-5"
      style={{ width: '100%' }}
    >
      <Row className="w-100">
        <Col className="d-flex align-items-center justify-content-center h-auto">
          <Card
            style={{ width: '100%', maxWidth: '1000px' }}
            className="p-3 shadow-lg h-100"
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Reset Password</h2>
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              {emailSent && (
                <div className="alert alert-success text-center">
                  Password reset email sent! Check your inbox.
                </div>
              )}
              <Form className="w-100" onSubmit={onSubmit}>
                {/* Email Field */}
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
                    disabled={isSigningIn}
                  />
                </Form.Group>

                {/* Reset Password button */}
                <Button
                  variant="primary"
                  className="w-100 py-3 mb-3 mt-3"
                  type="submit"
                  size="lg"
                  disabled={isSigningIn}
                >
                  Reset Password
                </Button>

                {/* Remember Password */}
                <div className="mt-3">
                  <p>
                    Remember your Password? Click{' '}
                    <span
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={() => navigate('/signIn')}
                    >
                      <b>here</b>
                    </span>{' '}
                    to Sign In
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
