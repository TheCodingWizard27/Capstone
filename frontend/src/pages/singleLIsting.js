import React, { useState } from 'react';
import NavBar from '../components/navBar';
import {
  Image,
  Button,
  Card,
  Container,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../style/stylingsingle.css';

const MainProductSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    `${process.env.PUBLIC_URL}/images/landingPage.jpg`,
    `${process.env.PUBLIC_URL}/images/aloo.jpg`,
    `${process.env.PUBLIC_URL}/images/landingPage.jpg`,
    `${process.env.PUBLIC_URL}/images/aloo.jpg`,
    `${process.env.PUBLIC_URL}/images/landingPage.jpg`,
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handlePreviewClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Col md={8} lg={6} className="d-flex flex-column align-items-center mt-4">
      <Card className="picture-card p-3 mb-2">
        <div className="main-image position-relative">
          <Image src={images[currentImageIndex]} alt="Main Image" fluid />
          <button className="arrow-left" onClick={handlePrevImage}>
            <FaArrowLeft />
          </button>
          <button className="arrow-right" onClick={handleNextImage}>
            <FaArrowRight />
          </button>
        </div>
        <div className="preview-images d-flex flex-row flex-wrap mt-3">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className={`preview-image mb-2 ${
                index === currentImageIndex ? 'active' : ''
              }`}
              onClick={() => handlePreviewClick(index)}
              style={{
                height: '100px',
                width: '15%',
                minWidth: '100px',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      </Card>
    </Col>
  );
};

const ProductDetailsSection = () => (
  <Col md={8} lg={6} className="d-flex flex-column align-items-start mt-4">
    <Card className="details-card p-3">
      <h4>Panasonic LUMIX FZ80D Compact Camera</h4>
      <div className="rating mb-2">
        <span>4.4 ★★★★☆</span> | <span>10 Ratings</span>
      </div>
      <div className="price mb-3">$1000.00</div>
      <div>
        <strong>Brand:</strong> Panasonic
      </div>
      <div>
        <strong>Condition:</strong> Open Box
      </div>
      <div>
        <strong>Color:</strong> Black
      </div>
      <div>
        <strong>Status:</strong> Available
      </div>
      <hr />
      <p>
        Panoramas in Extraordinary Detail: 20mm wide-angle lens creates
        breathtaking landscapes, with a powerful 60x zoom to capture the big
        picture as well as fine details.
      </p>
      <p>
        An Always-Clear View, Even in Bright Sunlight: 2,360k-dot. Large LVF
        ensures you'll see your screen without glare.
      </p>
      <div className="button-group mt-3">
        <Button variant="primary" className="me-2">
          Contact Seller
        </Button>
        <Button variant="dark" className="me-2">
          Add to Watchlist
        </Button>
        <Button variant="danger">Report Listing</Button>
      </div>
    </Card>
  </Col>
);

const SimilarItemsSection = ({ open, toggleOpen }) => (
  <Card className="floating-card p-4">
    <h5 className="section-title">Similar Items</h5>
    <Collapse in={open}>
      <Row className="additional-container card-grid justify-content-center">
        {[1, 2, 3, 4, 5].map((idx) => (
          <Col lg={3} md={5} sm={6} key={idx} className="mb-3">
            <Card className="item-card">
              <Card.Img
                variant="top"
                src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
              />
              <Card.Body>
                <Card.Title>Similar Item {idx}</Card.Title>
                <Card.Text>$500.00</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Collapse>
    <Button
      variant="link"
      onClick={toggleOpen}
      aria-expanded={open}
      className="collapse-button"
    >
      {open ? 'Collapse' : 'Expand'} Similar Items
    </Button>
  </Card>
);

const OtherItemsSection = ({ open, toggleOpen }) => (
  <Card className="floating-card p-4">
    <h5 className="section-title">Other Items by the Seller</h5>
    <Collapse in={open}>
      <Row className="additional-container card-grid justify-content-center">
        {[1, 2, 3, 4, 5].map((idx) => (
          <Col lg={3} md={4} sm={6} key={idx} className="mb-3">
            <Card className="item-card">
              <Card.Img
                variant="top"
                src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
              />
              <Card.Body>
                <Card.Title>Other Item {idx}</Card.Title>
                <Card.Text>$650.00</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Collapse>
    <Button
      variant="link"
      onClick={toggleOpen}
      aria-expanded={open}
      className="collapse-button"
    >
      {open ? 'Collapse' : 'Expand'} Other Items
    </Button>
  </Card>
);

const SingleListing = () => {
  const [similarItemsOpen, setSimilarItemsOpen] = useState(true);
  const [otherItemsOpen, setOtherItemsOpen] = useState(true);

  return (
    <div style={{ height: '100vh', marginBottom: '100px' }}>
      <NavBar />
      <Container className="mt-4 d-flex flex-column align-items-center">
        <Row className="justify-content-center">
          <MainProductSection />
          <ProductDetailsSection />
        </Row>
        <br />
        <SimilarItemsSection
          open={similarItemsOpen}
          toggleOpen={() => setSimilarItemsOpen(!similarItemsOpen)}
        />
        <br />
        <OtherItemsSection
          open={otherItemsOpen}
          toggleOpen={() => setOtherItemsOpen(!otherItemsOpen)}
        />
        <br />
      </Container>
    </div>
  );
};

export default SingleListing;
