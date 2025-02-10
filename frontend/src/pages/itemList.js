import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import FilterBar from '../components/filterBar';
import Card from '../components/itemCard';
import { useLocation } from 'react-router-dom';

const ItemList = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || 'All';

  useEffect(() => {
    setSelectedCategory(categoryFromUrl); // Set the selected category
    fetchItems(categoryFromUrl); // Fetch items when the component mounts
  }, [categoryFromUrl]); // Re-fetch if categoryFromUrl changes

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

  // Handle category change from FilterBar
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchItems(category); // Refetch when category changes
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px' }}>
        {/* Filter Bar */}
        <div style={{ marginBottom: '20px' }}>
          <FilterBar
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            onSortChange={() => {}}
          />
        </div>

        {/* Loading, error or results */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  imageUrl={item.picUrls[0]}
                  title={item.title}
                  brand={item.brand}
                  price= {item.price}
                  description={
                    item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description
                  }
                />
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ItemList;
