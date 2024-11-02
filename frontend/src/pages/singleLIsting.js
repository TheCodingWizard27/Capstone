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
import '../style/stylingsingle.css';

const MainProductSection = () => (
  <Col md={8} lg={5} className="d-flex flex-column align-items-center mt-4">
    <Card className="picture-card p-3 mb-2">
      <div className="main-image">
        <Image
          src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
          alt="Main Image"
          fluid
        />
      </div>
      <div className="preview-images d-flex flex-row flex-wrap mt-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <img
            key={index}
            src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
            alt={`Preview ${index}`}
            className="preview-image mb-2"
            style={{
              height: '100px',
              width: '15%',
              minWidth: '100px', // Ensures images don't shrink too small
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
    </Card>
  </Col>
);

const ProductDetailsSection = () => (
  <Col md={8} lg={5} className="d-flex flex-column align-items-start mt-4">
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
      <Row className="additional-container card-grid">
        {[1, 2, 3, 4, 5].map((idx) => (
          <Col md={2} sm={6} key={idx} className="mb-3">
            <Card className="item-card">
              <Card.Img
                variant="top"
                src={`${process.env.PUBLIC_URL}/images/preview${idx}.jpg`}
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
      <Row className="additional-container card-grid">
        {[1, 2, 3, 4, 5].map((idx) => (
          <Col md={2} sm={6} key={idx} className="mb-3">
            <Card className="item-card">
              <Card.Img
                variant="top"
                src={`${process.env.PUBLIC_URL}/images/preview${idx + 1}.jpg`}
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
    <>
      <NavBar />
      <Container fluid className="mt-4">
        <Row className="justify-content-center">
          <MainProductSection />
          <ProductDetailsSection />
        </Row>
        <br></br>

        <SimilarItemsSection
          open={similarItemsOpen}
          toggleOpen={() => setSimilarItemsOpen(!similarItemsOpen)}
        />

        <br></br>

        <OtherItemsSection
          open={otherItemsOpen}
          toggleOpen={() => setOtherItemsOpen(!otherItemsOpen)}
        />
      </Container>
    </>
  );
};

export default SingleListing;
