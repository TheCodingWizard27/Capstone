import NavBar from '../components/navBar';
import FilterBar from "../components/filterBar";
import React from 'react';

// Dummy data for search results
const searchResults = [
    {
        id: 1,
        title: "Camera and Lens For Sale",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg"
    },
    {
        id: 2,
        title: "Camera and Lens For Sale",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg"
    },
    {
        id: 3,
        title: "Camera and Lens For Sale",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg"
    },
    {
        id: 4,
        title: "Camera and Lens For Sale",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg"
    },
    {
        id: 5,
        title: "Camera and Lens For Sale",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl: "https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg"
    }
];

const SearchPage = () => {
    return (
        <>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <FilterBar />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {searchResults.map((item) => (
                        <div key={item.id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '20px', 
                            padding: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: '5px' 
                        }}>
                            <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                            />
                            <div>
                                <h3 style={{ margin: '0', fontSize: '1.2em' }}>{item.title}</h3>
                                <p style={{ margin: '5px 0 0', color: '#666' }}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );       
};

export default SearchPage;
