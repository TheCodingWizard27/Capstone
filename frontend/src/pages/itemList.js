import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import FilterBar from '../components/filterBar';
import Card from '../components/itemCard';
import { useLocation } from 'react-router-dom';
import { use } from 'react';

const ItemList = () => {
  const [allSearchResults, setAllSearchedResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState(allSearchResults);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || 'All';

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    fetchItems(categoryFromUrl);
  }, []);

  const fetchItems = async (category) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND
        }/api//getListingsByCategory?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      console.log(data);
      setFilteredResults(data);
      console.log(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFilteredResults([]);
    }
  };

  // Handle category change from FilterBar
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px' }}>
        {/* Filter Bar */}
        <div style={{ marginBottom: '20px' }}>
          <FilterBar
            onCategoryChange={handleCategoryChange}
            onSortChange={() => {}}
          />
        </div>

        {/* Search Results */}
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
      </div>
    </>
  );
};

export default ItemList;
