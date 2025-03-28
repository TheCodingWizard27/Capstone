import { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleClick = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Styles object
  const styles = {
    navbar: {
      backgroundColor: 'var(--bs-primary)',
      padding: scrolled ? '0.7rem 0' : '1rem 0',
      transition: 'all 0.3s ease',
      boxShadow: scrolled
        ? '0 5px 15px rgba(0, 0, 0, 0.1)'
        : '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      position: 'sticky',
      top: 0,
    },
    brand: {
      color: 'white',
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '0.5px',
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: 500,
      margin: '0 1rem',
      padding: '0.5rem 0.75rem',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    toggleButton: {
      border: 'none',
      color: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'transparent',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      transform: !isNavCollapsed ? 'rotate(90deg)' : 'none',
      boxShadow: 'none',
    },
    authButtons: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
    },
    loginBtn: {
      borderRadius: '6px',
      padding: '0.5rem 1.25rem',
      fontWeight: 500,
      borderWidth: '2px',
      transition: 'all 0.3s ease',
    },
    registerBtn: {
      borderRadius: '6px',
      padding: '0.5rem 1.25rem',
      fontWeight: 500,
      backgroundColor: 'white',
      color: 'var(--bs-primary)',
      borderColor: 'white',
      borderWidth: '2px',
      transition: 'all 0.3s ease',
    },
  };

  // Custom CSS for hover effects and responsive layout
  const customCSS = `
    .nav-link-custom:hover {
      color: white !important;
    }
    
    .nav-link-custom::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 50%;
      background-color: white;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    .nav-link-custom:hover::after {
      width: 70%;
    }
    
    .login-btn:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    .register-btn:hover {
      background-color: transparent !important;
      color: white !important;
    }
    
    @media (max-width: 991.98px) {
      .nav-collapse {
        background-color: var(--bs-primary);
        padding: 1rem;
        margin-top: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .nav-link-custom {
        margin: 0.5rem 0 !important;
        padding: 0.5rem !important;
      }
      
      .auth-buttons {
        margin-top: 1rem;
        flex-direction: column;
        width: 100%;
      }
      
      .btn-link {
        width: 100%;
        display: block;
      }
      
      .login-btn, .register-btn {
        width: 100%;
        margin: 0.25rem 0;
      }
    }
  `;

  return (
    <>
      {/* Inject custom CSS */}
      <style>{customCSS}</style>

      <Navbar
        expand="lg" // This makes it collapse on screens smaller than lg
        style={styles.navbar}
        expanded={!isNavCollapsed}
      >
        <Container>
          {/* Brand with enhanced styling */}
          <Navbar.Brand href="#landing" style={styles.brand}>
            Shop Simplify
          </Navbar.Brand>

          {/* Toggle button only visible on smaller screens (Bootstrap handles this) */}
          <Navbar.Toggle
            as={Button}
            variant="outline-light"
            className="toggle-button d-lg-none" // Explicitly hide on lg screens and up
            style={styles.toggleButton}
            onClick={handleToggleClick}
            aria-controls="navbar-nav"
          >
            {isNavCollapsed ? <FaBars size={22} /> : <FaTimes size={22} />}
          </Navbar.Toggle>

          {/* Collapsible navigation */}
          <Navbar.Collapse id="navbar-nav" className="nav-collapse">
            <Nav className="mx-auto">
              <Nav.Link
                href="#why"
                className="nav-link-custom"
                style={styles.navLink}
                onClick={() => setIsNavCollapsed(true)}
              >
                Why Shop Simplify?
              </Nav.Link>
              <Nav.Link
                href="#features"
                className="nav-link-custom"
                style={styles.navLink}
                onClick={() => setIsNavCollapsed(true)}
              >
                Explore Features
              </Nav.Link>
              <Nav.Link
                href="#team"
                className="nav-link-custom"
                style={styles.navLink}
                onClick={() => setIsNavCollapsed(true)}
              >
                Our Team
              </Nav.Link>
            </Nav>

            {/* Auth buttons with improved styling */}
            <div style={styles.authButtons} className="auth-buttons">
              <Link to="/signIn" className="btn-link">
                <Button
                  variant="outline-light"
                  className="login-btn"
                  style={styles.loginBtn}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" className="btn-link">
                <Button
                  variant="light"
                  className="register-btn"
                  style={styles.registerBtn}
                >
                  Register
                </Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default LandingNavbar;
