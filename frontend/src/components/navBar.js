import { useState } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import DropUser from './dropUser';
import SearchBar from './searchBar';

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { currentUser } = useAuth();
  const { cartCount } = useCart();
  const [searchResults, setSearchResults] = useState([]);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  // Styles object for inline styling
  const styles = {
    navbar: {
      backgroundColor: '#1a5b9a',
      padding: '1.25rem 0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      position: 'sticky',
      top: 0,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1400px',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '2rem',
    },
    logoImage: {
      maxWidth: '70px',
      height: 'auto',
    },
    searchContainer: {
      flex: '1',
      maxWidth: '750px',
      margin: '0 3rem',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      marginLeft: '2rem',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '1.05rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    sellLinkContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    sellLink: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '1.05rem',
    },
    sellText: {
      fontSize: '0.75rem',
      opacity: 0.85,
      color: 'white',
      marginBottom: '0.2rem',
    },
    cartBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#ff4d4f',
      color: 'white',
      borderRadius: '50%',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      minWidth: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px',
    },
    mobileToggle: {
      display: 'none',
      color: 'white',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0.5rem',
      '@media (max-width: 991.98px)': {
        display: 'block',
      },
    },
    drawer: {
      position: 'fixed',
      top: 0,
      left: showDrawer ? 0 : '-280px',
      width: '280px',
      height: '100vh',
      backgroundColor: '#1a5b9a',
      zIndex: 1100,
      transition: 'left 0.3s ease',
      boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
    },
    drawerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    drawerContent: {
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    drawerLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
      padding: '0.5rem 0',
    },
    drawerSellContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    drawerSellLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
    },
    drawerSellText: {
      fontSize: '0.85rem',
      opacity: 0.85,
      color: 'white',
      marginBottom: '0.2rem',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1050,
    },
    dropUserWrapper: {
      backgroundColor: 'transparent',
    },
  };

  // CSS for hover effects and media queries
  const customCSS = `
    .nav-link:hover {
      opacity: 0.9;
    }
    
    .sell-container:hover .sell-link,
    .sell-container:hover .sell-text {
      opacity: 0.9;
    }
    
    /* Fix for dropdown user background */
    .dropdown-toggle.btn {
      background-color: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: white !important;
    }
    
    .dropdown-toggle.btn:hover,
    .dropdown-toggle.btn:focus,
    .dropdown-toggle.btn:active {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    /* Fix for dropdown menu in drawer */
    .drawer-content .dropdown-toggle.btn {
      padding-left: 0 !important;
    }
    
    @media (max-width: 1200px) {
      .search-container {
        margin: 0 1.5rem !important;
      }
      
      .nav-links {
        gap: 1.5rem !important;
      }
    }
    
    @media (max-width: 991.98px) {
      .desktop-nav {
        display: none !important;
      }
      
      .mobile-toggle {
        display: block !important;
      }
      
      .search-container {
        margin: 0 1rem !important;
      }
      
      .logo-container {
        margin-right: 0.5rem !important;
      }
      
      .logo-image {
        max-width: 60px !important;
      }
      
      .navbar-container {
        padding: 0 0.5rem !important;
      }
    }
  `;

  return (
    <>
      <style>{customCSS}</style>

      <Navbar style={styles.navbar}>
        <Container style={styles.container} className="navbar-container">
          {/* Logo */}
          <Link to="/" style={styles.logoContainer} className="logo-container">
            <img
              src="/images/Logo.png"
              alt="Logo"
              style={styles.logoImage}
              className="img-fluid logo-image"
            />
          </Link>

          {/* Search Bar */}
          <div style={styles.searchContainer} className="search-container">
            <SearchBar setSearchResults={setSearchResults} />
          </div>

          {/* Mobile Toggle */}
          <Button
            className="d-lg-none mobile-toggle"
            style={styles.mobileToggle}
            onClick={toggleDrawer}
          >
            <FaBars size={24} />
          </Button>

          {/* Desktop Navigation */}
          <div style={styles.navLinks} className="desktop-nav nav-links">
            <div style={styles.sellLinkContainer} className="sell-container">
              <span style={styles.sellText} className="sell-text">
                Have an item to sell?
              </span>
              <Link
                to="/addListing"
                style={styles.sellLink}
                className="sell-link"
              >
                Sell
              </Link>
            </div>

            <Link to="/messageList" style={styles.navLink} className="nav-link">
              <FaEnvelope size={20} />
              <span>Messages</span>
            </Link>

            <Link to="/cart" style={styles.navLink} className="nav-link">
              <div style={{ position: 'relative' }}>
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span style={styles.cartBadge}>{cartCount}</span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            <div style={styles.dropUserWrapper}>
              <DropUser />
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Drawer */}
      <div style={styles.drawer}>
        <div style={styles.drawerHeader}>
          <h5 style={{ color: 'white', margin: 0 }}>Menu</h5>
          <Button
            style={{ backgroundColor: 'transparent', border: 'none' }}
            onClick={toggleDrawer}
          >
            <FaTimes size={24} color="white" />
          </Button>
        </div>

        <div style={styles.drawerContent} className="drawer-content">
          <div style={styles.drawerSellContainer}>
            <span style={styles.drawerSellText}>Have an item to sell?</span>
            <Link
              to="/addListing"
              style={styles.drawerSellLink}
              onClick={toggleDrawer}
            >
              Sell
            </Link>
          </div>

          <Link
            to="/messageList"
            style={styles.drawerLink}
            onClick={toggleDrawer}
          >
            Messages
          </Link>

          <Link to="/cart" style={styles.drawerLink} onClick={toggleDrawer}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          <div style={{ marginTop: '1rem' }}>
            <DropUser />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showDrawer && <div style={styles.overlay} onClick={toggleDrawer}></div>}
    </>
  );
};

export default NavBar;
