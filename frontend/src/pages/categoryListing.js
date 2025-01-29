import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access dynamic route parameters
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { storage, getDownloadURL, ref } from '../firebase/firebaseConfig'; // Import Firebase Storage functions
import CategoryCard from '../components/categoryCard';

const CategoryListing = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const [imageUrls, setImageUrls] = useState([]); // State to store image URLs for multiple images

  useEffect(() => {
    // Fetch category details from your backend API
    fetch(`${process.env.REACT_APP_BACKEND}/api/categories/${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryDetails(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError('Error fetching category details.'); // Set error message
        setLoading(false);
      });
  }, [categoryName]);

  // Function to fetch images from Firebase Storage for this category
  const fetchImages = async () => {
    const images = [];
    try {
      // Loop through image1.jpg, image2.jpg, etc.
      for (let i = 1; i <= 5; i++) {
        const storageRef = ref(
          storage,
          `categories/${categoryName}/image${i}.jpg`
        );
        const url = await getDownloadURL(storageRef);
        images.push(url);
      }
      setImageUrls(images); // Store all fetched images
    } catch (err) {
      console.log(`Error fetching images for ${categoryName}:`, err);
      setImageUrls(['https://via.placeholder.com/150']); // Default image if fetching fails
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images once the component is mounted
  }, [categoryName]);

  return (
    <Container className="mt-5 mb-5">
      {loading ? (
        <p>Loading category details...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert> // Show error alert
      ) : categoryDetails ? (
        <Row>
          <Col>
            <CategoryCard
              categoryName={categoryName}
              photos={imageUrls} // Pass all fetched images here
              fallbackMessage={
                imageUrls.length === 0 ? 'No images found' : null
              }
            />
            <div>
              <h3>Category Details</h3>
              <p>{categoryDetails.description}</p>
              {/* Render more details as needed */}
            </div>
          </Col>
        </Row>
      ) : (
        <Alert variant="info">Category not found.</Alert> // Show info alert if no category found
      )}
    </Container>
  );
};

export default CategoryListing;
