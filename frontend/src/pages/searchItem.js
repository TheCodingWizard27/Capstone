import React, { useState } from 'react';
import NavBar from '../components/navBar';
import FilterBar from "../components/filterBar";
import Card from "../components/itemCard";

// Dummy data for search results
const allSearchResults = [
    {
        id: 1,
        title: "Camera and Lens For Sale",
        description: "High-quality camera and lens for sale.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg",
        category: "Electronics"
    },
    {
        id: 2,
        title: "Camera and Lens For Sale",
        description: "High-quality camera and lens for sale.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg",
        category: "Electronics"
    },
    {
        id: 3,
        title: "Camera and Lens For Sale",
        description: "High-quality camera and lens for sale.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg",
        category: "Electronics"
    },
    {
        id: 4,
        title: "Camera and Lens For Sale",
        description: "High-quality camera and lens for sale.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg",
        category: "Electronics"
    },
];

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState(allSearchResults);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Handle search input change
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterResults(query, selectedCategory);
    };

    // Handle category change from FilterBar
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterResults(searchQuery, category);
    };

    // Filter results based on search query and category
    const filterResults = (query, category) => {
        const results = allSearchResults.filter(item => {
            const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = category === "All" || item.category === category;
            return matchesQuery && matchesCategory;
        });
        setFilteredResults(results);
    };

    return (
        <>
            <NavBar />
            <div style={{ padding: '20px' }}>
                {/* Filter Bar */}
                <div style={{ marginBottom: '20px' }}>
                    <FilterBar onCategoryChange={handleCategoryChange} onSortChange={() => {}} />
                </div>

                {/* Search Results */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((item) => (
                            <Card
                                key={item.id}
                                imageUrl={item.imageUrl}
                                title={item.title}
                                description={item.description}
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

export default SearchPage;
