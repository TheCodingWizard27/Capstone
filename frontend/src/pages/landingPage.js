import { useEffect } from 'react';
import NavigationBar from '../components/landingNavBar';
import {
 Image,
 Button,
 Container,
 Row,
 Col,
 Card,
 Badge,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="landing-page">
      <NavigationBar />
      <HeroSection />
      <WhyShop />
      <Features />
      <AboutUS />
      <CallToAction />
      <Footer />

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.show {
          opacity: 1;
          transform: translateY(0);
        }
        .section-divider {
          height: 100px;
          overflow: hidden;
          position: relative;
        }
        .section-divider svg {
          position: absolute;
          width: 100%;
          height: 100px;
        }
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .hover-list-item {
          transition: background-color 0.2s ease, transform 0.2s ease;
          border-radius: 6px;
        }
        .hover-list-item:hover {
          background-color: rgba(255, 255, 255, 0.5);
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="hero-section position-relative overflow-hidden">
      <div
        className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <h1 className="display-3 fw-bold text-center mb-3 text-white">
                Simplify your Shopping,{' '}
                <span className="text-primary">Amplify your Life</span>
              </h1>
              <p className="lead text-center mb-4 fs-4 text-light">
                Your one-stop platform for local buying and selling with secure
                transactions and real-time tracking. Whether you're looking to
                declutter your home or find the perfect item, we've got you
                covered with the best prices.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/home">
                  <Button size="lg" className="px-4 py-2 fw-semibold">
                    <i className="bi bi-shop me-2"></i> Explore Listings
                  </Button>
                </Link>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-2 fw-semibold"
                >
                  <i className="bi bi-info-circle me-2"></i> Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Image
        src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
        alt="ShopSimplify"
        fluid
        className="w-100"
        style={{
          height: '90vh',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.8)',
        }}
      />
      <div className="section-divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          fill="#ffffff"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

const WhyShop = () => {
  return (
    <Container fluid className="py-5 bg-light" id="why">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center animate-on-scroll">
            <Badge bg="primary" className="mb-3">
              WHY CHOOSE US
            </Badge>
            <h2 className="fw-bold">Why should you use ShopSimplify?</h2>
            <p className="text-muted">
              See how ShopSimplify transforms your buying and selling experience
            </p>
          </Col>
        </Row>
        <Row className="g-4 animate-on-scroll">
          <Col md={6}>
            <Card
              className="h-100 border-0 shadow-sm hover-card"
              style={{
                backgroundColor: '#e6f9ec',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-success bg-opacity-25 p-3 me-3">
                    <i
                      className="bi bi-check-circle"
                      style={{ fontSize: '1.5rem', color: '#198754' }}
                    ></i>
                  </div>
                  <h4 className="card-title mb-0" style={{ color: '#198754' }}>
                    With ShopSimplify
                  </h4>
                </div>
                <ul className="list-unstyled">
                  {[
                    'Sell and buy items locally in one easy platform',
                    'Seamless transaction management',
                    'Direct and secure communication between buyers and sellers',
                    'Integrated secure payments within the app',
                    'Real-time tracking of sales, orders, and transactions',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 d-flex align-items-start p-2 hover-list-item"
                    >
                      <span className="me-3 text-success">
                        <i
                          className="bi bi-check-circle-fill"
                          style={{ fontSize: '1.25rem' }}
                        ></i>
                      </span>
                      <span style={{ color: '#198754' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="h-100 border-0 shadow-sm hover-card"
              style={{
                backgroundColor: '#f9ecec',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-danger bg-opacity-25 p-3 me-3">
                    <i
                      className="bi bi-x-circle"
                      style={{ fontSize: '1.5rem', color: '#dc3545' }}
                    ></i>
                  </div>
                  <h4 className="card-title mb-0" style={{ color: '#dc3545' }}>
                    Without ShopSimplify
                  </h4>
                </div>
                <ul className="list-unstyled">
                  {[
                    'Limited options to sell or buy locally',
                    'No easy way to manage transactions',
                    'Communication with buyers/sellers is cumbersome',
                    'Lack of a unified platform for secure payments',
                    'No real-time tracking for transactions or orders',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 d-flex align-items-start p-2 hover-list-item"
                    >
                      <span className="me-3 text-danger">
                        <i
                          className="bi bi-x-circle-fill"
                          style={{ fontSize: '1.25rem' }}
                        ></i>
                      </span>
                      <span style={{ color: '#dc3545' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};



const Features = () => {
 const features = [
   {
     icon: 'bi-search',
     title: 'Smart Search',
     description:
       'Find exactly what you need with our intelligent search filters and location-based results',
     color: '#6610f2',
   },
   {
     icon: 'bi-chat-dots',
     title: 'Secure Messaging',
     description:
       'Communicate directly with buyers and sellers through our encrypted messaging system',
     color: '#0dcaf0',
   },
   {
     icon: 'bi-wallet2',
     title: 'Easy Payments',
     description:
       'Multiple payment options with secure transaction processing and escrow protection',
     color: '#fd7e14',
   },
   {
     icon: 'bi-star',
     title: 'Ratings & Reviews',
     description:
       'Build trust with verified ratings and reviews from real users',
     color: '#ffc107',
   },
 ];