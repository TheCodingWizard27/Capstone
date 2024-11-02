import React, { useState } from 'react';

const FilterBar = ({ onCategoryChange, onSortChange }) => {
    const [selectedCategory, setSelectedCategory] = useState("Electronics");
    const [sortOption, setSortOption] = useState("Relevance");

    const categories = ["Electronics", "Books", "Clothing", "Furniture"];
    const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest First"];

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        onCategoryChange(newCategory);
    };

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        setSortOption(newSort);
        onSortChange(newSort);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start', // Align items to the start
            alignItems: 'center',
            padding: '10px 0', // Remove extra padding and set vertical padding only
            marginBottom: '20px',
            backgroundColor: 'transparent'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}> {/* Add marginRight for spacing */}
                <label htmlFor="category" style={{ marginRight: '8px', fontWeight: 'bold' }}>Currently Viewing:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ padding: '5px', fontSize: '14px' }}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="sort" style={{ marginLeft: '900px', marginRight: '8px', fontWeight: 'bold' }}>Sort By:</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    style={{ padding: '5px', fontSize: '14px' }}
                >
                    {sortOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
