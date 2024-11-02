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
            alignItems: 'center',
            padding: '10px 0',
            marginBottom: '20px',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            {/* Currently Viewing Section */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
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

            {/* Sort By Section */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0' }}>
                <label htmlFor="sort" style={{ marginRight: '8px', fontWeight: 'bold' }}>Sort By:</label>
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
            
            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="display: flex"] {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    div[style*="justify-content: space-between"] {
                        justify-content: flex-start;
                    }
                    div[style*="align-items: center"]:not([style*="flex-direction"]) {
                        margin-bottom: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default FilterBar;
