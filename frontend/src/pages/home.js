import NavBar from '../components/navBar';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CategoryCard from '../components/categoryCard';

const categories = [
  {
    name: 'Clothing',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Shoes',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Electronics',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Furniture',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Books, Movies, Games-CD',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Sports',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Furniture',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Books, Movies, Games-CD',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Sports',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Furniture',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Books, Movies, Games-CD',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
  {
    name: 'Sports',
    photos: [
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
      'https://en.reset.org/app/uploads/2021/02/1024px-google_loon_-_launch_event.jpg',
    ],
  },
];

const Home = () => {
  return (
    <>
      <NavBar />
      <Container className="g-5 mt-5">
        <Row className="g-5 mt-4">
          {categories.map((category) => (
            <Col xs={12} md={6} lg={4} key={category.name}>
              <CategoryCard
                categoryName={category.name}
                photos={category.photos}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;

// const Home = () => {
//   return <NavBar />;
// };

// export default Home;
