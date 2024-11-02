import React from "react";
import NavBar from "../components/navBar";
import { Image, Button, Card } from "react-bootstrap";
import '../style/stylingsingle.css';

const SingleListing = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid d-flex justify-content-center mt-4">
        <div className="listing-container">
          {/* Image Preview Section */}
          <div className="image-preview">
            {/* Small preview images */}
            <img src={`${process.env.PUBLIC_URL}/images/preview1.jpg`} alt="Preview 1" />
            <img src={`${process.env.PUBLIC_URL}/images/preview2.jpg`} alt="Preview 2" />
            <img src={`${process.env.PUBLIC_URL}/images/preview3.jpg`} alt="Preview 3" />
            <img src={`${process.env.PUBLIC_URL}/images/preview4.jpg`} alt="Preview 4" />
            <img src={`${process.env.PUBLIC_URL}/images/preview5.jpg`} alt="Preview 5" />
          </div>

          {/* Main Image Section */}
          <div className="main-image">
            <Image
              src={`${process.env.PUBLIC_URL}/images/landingPage.jpg`}
              alt="Main Image"
              fluid
            />
          </div>

          {/* Details Section */}
          <div className="details-section">
            <div className="details-card">
              <h4>Panasonic LUMIX FZ80D Compact Camera</h4>
              <div className="rating">
                <span>4.4 ★★★★☆</span>
                <span>10 Ratings</span>
              </div>
              <div className="price">$1000.00</div>
              <div>Brand: Panasonic</div>
              <div>Condition: Open Box</div>
              <div>Color: Black</div>
              <div>Status: Available</div>
              <div className="divider"></div>
              <p>
                Panoramas in Extraordinary Detail: 20mm wide-angle lens creates breathtaking landscapes,
                with a powerful 60x zoom to capture the big picture as well as fine details.
              </p>
              <p>
                An Always-Clear View, Even in Bright Sunlight: 2,360k-dot. Large LVF ensures you'll see
                your screen without glare.
              </p>

              {/* Button Group */}
              <div className="button-group">
                <Button variant="primary">Contact Seller</Button>
                <Button variant="dark">Add to Watchlist</Button>
                <Button variant="danger">Report Listing</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items Section */}
        <div className="additional-container">
          <h5>Similar Items</h5>
          <div className="card-grid">
            {/* Similar item cards */}
            {[1, 2, 3, 4].map((_, idx) => (
              <div className="item-card" key={idx}>
                <img src={`${process.env.PUBLIC_URL}/images/preview${idx + 1}.jpg`} alt={`Similar Item ${idx + 1}`} />
                <h6>Similar Item {idx + 1}</h6>
                <p>$500.00</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Items by Seller Section */}
        <div className="additional-container">
          <h5>Other Items by the Seller</h5>
          <div className="card-grid">
            {/* Other items by seller cards */}
            {[1, 2, 3, 4].map((_, idx) => (
              <div className="item-card" key={idx}>
                <img src={`${process.env.PUBLIC_URL}/images/preview${idx + 2}.jpg`} alt={`Other Item ${idx + 1}`} />
                <h6>Other Item {idx + 1}</h6>
                <p>$650.00</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleListing;
