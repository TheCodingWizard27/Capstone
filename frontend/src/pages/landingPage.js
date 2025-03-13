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