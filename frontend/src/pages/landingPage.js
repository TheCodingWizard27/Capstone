import { useEffect } from 'react';
import NavigationBar from '../components/landingNavBar';
import {
 Image,
 Button,
 Container,
 Row,
 Col,
 Card,
 Badge,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <div className="landing-page">
      <NavigationBar />
      <HeroSection />
      <WhyShop />
      <Features />
      <AboutUS />
      <CallToAction />
      <Footer />

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.show {
          opacity: 1;
          transform: translateY(0);
        }
        .section-divider {
          height: 100px;
          overflow: hidden;
          position: relative;
        }
        .section-divider svg {
          position: absolute;
          width: 100%;
          height: 100px;
        }
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .hover-list-item {
          transition: background-color 0.2s ease, transform 0.2s ease;
          border-radius: 6px;
        }
        .hover-list-item:hover {
          background-color: rgba(255, 255, 255, 0.5);
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};
