import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/navBar';
import '../style/item-list.css';

const ItemList = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || 'All';

  // Track window resize for responsive styles
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    fetchItems(categoryFromUrl);
  }, [categoryFromUrl]);

  const fetchItems = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND
        }/api/listings/category/${encodeURIComponent(category)}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setFilteredResults(data);
        setError(null);
      } else {
        setError('No results found.');
        setFilteredResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchItems(category);
  };

  // Check if we're on mobile
  const isMobile = windowWidth < 768;

  // Custom Card Component with better styling
  const EnhancedCard = ({ id, imageUrl, title, brand, price, description }) => {
    return (
      <Link to={`/listing/${id}`} className="card-link">
        <div className="card">
          <div className="card-image-container">
            {imageUrl ? (
              <img
                src={imageUrl || '/placeholder.svg'}
                alt={title}
                className="card-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
            ) : (
              <div className="card-no-image">No Image Available</div>
            )}
          </div>
          <div className="card-content">
            <h3 className="card-title">{title || 'Untitled Item'}</h3>
            {brand && <p className="card-brand">{brand}</p>}
            {description && <p className="card-description">{description}</p>}
            <div className="card-price">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="page">
      <NavBar />
      <div className={`container ${isMobile ? 'mobile' : ''}`}>
        {/* Category Header */}
        <div className="category-header">
          <div className="category-label">Currently Viewing:</div>
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Books">Books</option>
            <option value="Automobile">Automobile</option>
            <option value="Footwear">Footwear</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}

        {/* Error state */}
        {error && <div className="error-message">{error}</div>}

        {/* Results */}
        {!loading && !error && (
          <>
            {filteredResults.length > 0 ? (
              <div
                className={`grid-container ${
                  isMobile ? 'mobile' : windowWidth < 992 ? 'tablet' : 'desktop'
                }`}
              >
                {filteredResults.map((item) => (
                  <EnhancedCard
                    key={item.id}
                    id={item.id}
                    imageUrl={
                      item.picUrls && item.picUrls.length > 0
                        ? item.picUrls[0]
                        : null
                    }
                    title={item.title || 'Untitled Item'}
                    brand={item.brand || ''}
                    price={item.price || 0}
                    description={
                      item.description && item.description.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description || ''
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No items found in this category. Try another category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
