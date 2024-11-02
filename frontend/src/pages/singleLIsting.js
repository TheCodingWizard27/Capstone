import React, { useState } from "react";
import NavBar from "../components/navBar";
import { Image, Button, Card, Container, Row, Col, Collapse } from "react-bootstrap";
import "../style/stylingsingle.css";

const SingleListing = () => {
  const [similarItemsOpen, setSimilarItemsOpen] = useState(true);
  const [otherItemsOpen, setOtherItemsOpen] = useState(true);

  return (
    <>
      <NavBar />
      <Container fluid className="mt-4 ">
        <Row className="justify-content-center">
          {/* Main Product Section */}
          <Col md={8} lg={10} className="d-flex flex-wrap">
            {/* Left Side: Image Previews and Main Image */}
            <div className="image-container d-flex">
              {/* Image Previews (Hidden on Mobile) */}
              <div className="preview-images d-none d-md-flex flex-column me-3">
                {[1, 2, 3, 4, 5].map((index) => (
                  <img
                    key={index}
                    src={`${process.env.PUBLIC_URL}/images/preview${index}.jpg`}
                    alt={`Preview ${index}`}
                    className="preview-image mb-2"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="main-image">
                <Image
                  src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
                  alt="Main Image"
                  fluid
                />
              </div>
            </div>

            {/* Right Side: Product Details */}
            <Col md={7} className="details-section mt-4 m-0 mt-md-0">
              <Card className="details-card p-3">
                <h4>Panasonic LUMIX FZ80D Compact Camera</h4>
                <div className="rating mb-2">
                  <span>4.4 ★★★★☆</span> | <span>10 Ratings</span>
                </div>
                <div className="price mb-3">$1000.00</div>
                <div><strong>Brand:</strong> Panasonic</div>
                <div><strong>Condition:</strong> Open Box</div>
                <div><strong>Color:</strong> Black</div>
                <div><strong>Status:</strong> Available</div>
                <hr />
                <p>
                  Panoramas in Extraordinary Detail: 20mm wide-angle lens creates breathtaking landscapes,
                  with a powerful 60x zoom to capture the big picture as well as fine details.
                </p>
                <p>
                  An Always-Clear View, Even in Bright Sunlight: 2,360k-dot. Large LVF ensures you'll see
                  your screen without glare.
                </p>
                {/* Button Group */}
                <div className="button-group mt-3">
                  <Button variant="primary" className="me-2">Contact Seller</Button>
                  <Button variant="dark" className="me-2">Add to Watchlist</Button>
                  <Button variant="danger">Report Listing</Button>
                </div>
              </Card>
            </Col>
          </Col>
        </Row>

        {/* Divider */}
        <hr className="my-4" />
        <Card className="floating-card p-4"> 
        {/* Similar Items Section */}
        <h5 className="section-title">Similar Items</h5>
        <Collapse in={similarItemsOpen}>
          <Row className="additional-container">
            <Row className="card-grid">
              {[1, 2, 3, 4].map((idx) => (
                <Col md={3} sm={6} key={idx} className="mb-3">
                  <Card className="item-card">
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/preview${idx}.jpg`} />
                    <Card.Body>
                      <Card.Title>Similar Item {idx + 1}</Card.Title>
                      <Card.Text>$500.00</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Row>
        </Collapse>

        {/* Collapse Button for Similar Items */}
        <Button
          variant="link"
          onClick={() => setSimilarItemsOpen(!similarItemsOpen)}
          aria-expanded={similarItemsOpen}
          className="collapse-button"
        >
          {similarItemsOpen ? "Collapse" : "Expand"} Similar Items
        </Button>

        {/* Divider */}
        <hr className="my-4" />

        {/* Other Items by the Seller Section */}
        
        <h5 className="section-title">Other Items by the Seller</h5>
        <Collapse in={otherItemsOpen}>
          <Row className="additional-container">
            <Row className="card-grid">
              {[1, 2, 3, 4].map((idx) => (
                <Col md={3} sm={6} key={idx} className="mb-3">
                  <Card className="item-card">
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/preview${idx + 1}.jpg`} />
                    <Card.Body>
                      <Card.Title>Other Item {idx + 1}</Card.Title>
                      <Card.Text>$650.00</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Row>
        </Collapse>

        {/* Collapse Button for Other Items */}
        <Button
          variant="link"
          onClick={() => setOtherItemsOpen(!otherItemsOpen)}
          aria-expanded={otherItemsOpen}
          className="collapse-button"
        >
          {otherItemsOpen ? "Collapse" : "Expand"} Other Items
        </Button>
        </Card>
      </Container>
    </>
  );
};

export default SingleListing;
