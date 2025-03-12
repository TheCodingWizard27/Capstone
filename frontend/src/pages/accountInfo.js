import { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  Nav,
  Alert,
} from 'react-bootstrap';
import NavBar from '../components/navBar';
import MyListings from '../components/mylistings';


const AccountSettings = () => {
 const [activeSection, setActiveSection] = useState('profile');
 const [profilePic, setProfilePic] = useState(null);
 const [editField, setEditField] = useState({
   email: false,
   phone: false,
   password: false,
 });
 const [showSuccess, setShowSuccess] = useState(false);


 const [formData, setFormData] = useState({
   name: '',
   email: '',
   phone: '',
   bio: '',
   oldPassword: '',
   newPassword: '',
 });


 const handleChange = (e) => {
   const { id, value } = e.target;
   setFormData((prev) => ({ ...prev, [id]: value }));
 };


 const handleSubmit = (e) => {
   e.preventDefault();
   console.log('Updated Info:', formData);
   setShowSuccess(true);
   setTimeout(() => setShowSuccess(false), 3000);
 };
