import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navBar';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import '../style/stylingsingle.css';
import { MainProductSection, ProductDetailsSection, ItemSection } from '../components/listingComponents';

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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/listings/${id}`);
        setListingData(response.data);
        setSimilarItems(response.data.similarItems);
        setOtherItems(response.data.otherItems);
        console.log('Fetched listing data:', response.data);
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
        <ItemSection
          title="Same Category Items"
          items={similarItems}
          open={similarItemsOpen}
          toggleOpen={() => setSimilarItemsOpen(!similarItemsOpen)}
        />
        <br />
        <ItemSection
          title="Other Items by the Seller"
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
