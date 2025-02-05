import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import '../style/stylingsingle.css';

import { useParams } from 'react-router-dom';

const MainProductSection = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
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
    <Col md={12} lg={6} className="d-flex flex-column align-items-center mt-4">
      <Card className="picture-card p-3 mb-2">
        <div className="main-image">
          <Image src={images[currentImageIndex]} alt="Main Image" fluid />
          <button className="arrow-left" onClick={handlePrevImage}>
            <FaArrowLeft />
          </button>
          <button className="arrow-right" onClick={handleNextImage}>
            <FaArrowRight />
          </button>
        </div>
        <div className="preview-images d-flex flex-row flex-wrap">
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

const ProductDetailsSection = ({ details }) => (
  <Col md={12} lg={6} className="d-flex flex-column align-items-start mt-4">
    <Card className="details-card p-3">
      <h4>{details.title}</h4>
      <div className="rating mb-2">
        <span>{details.rating} ★★★★☆</span> |{' '}
        <span>{details.ratingsCount} Ratings</span>
      </div>
      <div className="price mb-2">${details.price}</div>
      <div>
        <strong>Brand:</strong> {details.brand}
      </div>
      <div>
        <strong>Condition:</strong> {details.condition}
      </div>
      <div>
        <strong>Color:</strong> {details.color}
      </div>
      <div>
        <strong>Status:</strong> {details.status}
      </div>
      <hr />
      <p>{details.description}</p>
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

const SimilarItemsSection = ({ items, open, toggleOpen }) => (
  <Card className="floating-card p-4">
    <h5 className="section-title">Similar Items</h5>
    <Collapse in={open}>
      <Row className="additional-container card-grid justify-content-center">
        {items.map((item, idx) => (
          <Col lg={3} md={5} sm={6} key={idx} className="mb-3">
            <Card className="item-card">
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
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

const OtherItemsSection = ({ items, open, toggleOpen }) => (
  <Card className="floating-card p-4">
    <h5 className="section-title">Other Items by the Seller</h5>
    <Collapse in={open}>
      <Row className="additional-container card-grid justify-content-center">
        {items.map((item, idx) => (
          <Col lg={3} md={4} sm={6} key={idx} className="mb-3">
            <Card className="item-card">
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
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
  const { id } = useParams();
  const [listingData, setListingData] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [similarItemsOpen, setSimilarItemsOpen] = useState(true);
  const [otherItemsOpen, setOtherItemsOpen] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/listings/${id}`
        );
        console.log(response.data);
        setListingData(response.data);
        setSimilarItems(response.data.similarItems);
        setOtherItems(response.data.otherItems);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    };
    fetchListingData();
  }, [id]);

  if (!listingData) return <div>Loading...</div>;

  return (
    <div style={{ height: '100vh', marginBottom: '100px' }}>
      <NavBar />
      <Container className="mt-4 d-flex flex-column align-items-center">
        <Row className="justify-content-center">
          <MainProductSection
            images={listingData.picUrls}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetailsSection details={listingData} />
        </Row>
        <br />
        <SimilarItemsSection
          items={similarItems}
          open={similarItemsOpen}
          toggleOpen={() => setSimilarItemsOpen(!similarItemsOpen)}
        />
        <br />
        <OtherItemsSection
          items={otherItems}
          open={otherItemsOpen}
          toggleOpen={() => setOtherItemsOpen(!otherItemsOpen)}
        />
        <br />
      </Container>
    </div>
  );
};

export default SingleListing;
