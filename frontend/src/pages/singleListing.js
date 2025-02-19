import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/navBar';
import {
  Image,
  Button,
  Card as BootstrapCard, // Alias Bootstrap's Card component
  Container,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import '../style/stylingsingle.css';
import Card from '../components/itemCard'; // Custom Card component for displaying item

// Main product image section with prev/next functionality

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
      <BootstrapCard className="picture-card p-3 mb-2">
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
      </BootstrapCard>
    </Col>
  );
};

const ProductDetailsSection = ({ details }) => {
  const navigate = useNavigate();

  return (
    <Col md={12} lg={6} className="d-flex flex-column align-items-start mt-4">
      <BootstrapCard className="details-card p-3">
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
          <Button
            variant="danger"
            onClick={() =>
              navigate(`/editListing/${details.id}`, {
                state: {
                  id: details.id,
                  formData: {
                    title: details.title,
                    brand: details.brand,
                    category: details.category,
                    price: details.price,
                    description: details.description,
                  },
                  files: details.picUrls.map((url) => ({ preview: url })),
                },
              })
            }
          >
            Edit Listing
          </Button>
        </div>
      </BootstrapCard>
    </Col>
  );
};
const SimilarItemsSection = ({ items, open, toggleOpen }) => (
  <BootstrapCard className="floating-card p-4">
    <h5 className="section-title">Same Category Items</h5>
    <Collapse in={open}>
      <div className="horizontal-scroll">
        {items.map((item, idx) => (
          <div key={idx} className="scroll-item">
            <Card
              id={item.id}
              imageUrl={item.picUrls[0]}
              title={item.title}
              brand={item.brand}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </Collapse>
    <Button
      variant="link"
      onClick={toggleOpen}
      aria-expanded={open}
      className="collapse-button"
    >
      {open ? "Collapse" : "Expand"} Same Category Items
    </Button>
  </BootstrapCard>
);

const OtherItemsSection = ({ items, open, toggleOpen }) => (
  <BootstrapCard className="floating-card p-4">
    <h5 className="section-title">Other Items by the Seller</h5>
    <Collapse in={open}>
      <div className="horizontal-scroll">
        {items.map((item, idx) => (
          <div key={idx} className="scroll-item">
            <Card
              id={item.id}
              imageUrl={item.picUrls[0]}
              title={item.title}
              brand={item.brand}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </Collapse>
    <Button
      variant="link"
      onClick={toggleOpen}
      aria-expanded={open}
      className="collapse-button"
    >
      {open ? "Collapse" : "Expand"} Other Items
    </Button>
  </BootstrapCard>
);

const SingleListing = () => {
  const { id } = useParams(); // Use the id from the URL params
  const [listingData, setListingData] = useState(null); // Store the data of the listing
  const [similarItems, setSimilarItems] = useState([]); // Store the similar items
  const [otherItems, setOtherItems] = useState([]); // Store other items by the seller
  const [similarItemsOpen, setSimilarItemsOpen] = useState(true); // Control visibility of similar items
  const [otherItemsOpen, setOtherItemsOpen] = useState(true); // Control visibility of other seller's items
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image for the main image section

  useEffect(() => {
    // Fetch the listing data when the component mounts
    const fetchListingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/listings/${id}`
        );
        console.log(listingData);
        setListingData(response.data);
        setSimilarItems(response.data.similarItems);
        setOtherItems(response.data.otherItems);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    };
    fetchListingData();
  }, [id]); // Re-fetch data if the id changes

  if (!listingData) return <div>Loading...</div>; // Show loading text while data is being fetched

  return (
    <div style={{ height: '100vh', marginBottom: '100px' }}>
      <NavBar />
      <Container className="mt-4 d-flex flex-column align-items-center">
        <Row className="justify-content-center">
          <MainProductSection
            images={listingData.picUrls} // Use the images from the fetched listing data
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetailsSection details={listingData} />
          {/* Display product details */}
        </Row>
        <br />
        {/* Display Similar Items Section */}
        <SimilarItemsSection
          items={similarItems}
          open={similarItemsOpen}
          toggleOpen={() => setSimilarItemsOpen(!similarItemsOpen)}
        />
        <br />
        {/* Display Other Items Section */}
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
