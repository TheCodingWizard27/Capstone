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

 const handleImageChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setProfilePic(reader.result);
     };
     reader.readAsDataURL(file);
   }
 };


 const handleEditToggle = (field) => {
   setEditField((prev) => {
     const newState = { ...prev, [field]: !prev[field] };


     // If we're saving, simulate a successful save
     if (prev[field] && !newState[field]) {
       setShowSuccess(true);
       setTimeout(() => setShowSuccess(false), 3000);
     }


     return newState;
   });
 };

 return (
   <>
     <NavBar />
     <Container
       fluid
       className="py-4 px-3"
       style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}
     >
       {showSuccess && (
         <Alert
           variant="success"
           className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-sm"
           style={{ zIndex: 1050, maxWidth: '90%', width: '400px' }}
           onClose={() => setShowSuccess(false)}
           dismissible
         >
           Changes saved successfully!
         </Alert>
       )}


       <Card
         className="mx-auto shadow border-0 overflow-hidden"
         style={{ maxWidth: '1000px', borderRadius: '12px' }}
       >
         <Card.Header className="bg-primary text-white py-3">
           <h3 className="mb-0">Account Settings</h3>
         </Card.Header>


         <Row className="g-0">
           {/* Left Side Menu */}
           <Col xs={12} md={3} className="border-end">
             {/* Desktop Profile Picture Section */}
             <div className="d-none d-md-block text-center p-3">
               <div
                 className="rounded-circle overflow-hidden shadow mx-auto d-flex align-items-center justify-content-center mb-3"
                 style={{
                   width: '120px',
                   height: '120px',
                   backgroundColor: '#e9ecef',
                   border: '3px solid #fff',
                 }}
               >
                 {profilePic ? (
                   <img
                     src={profilePic || '/placeholder.svg'}
                     alt="Profile"
                     className="w-100 h-100"
                     style={{ objectFit: 'cover' }}
                   />
                 ) : (
                   <i
                     className="bi bi-person-fill"
                     style={{ fontSize: '3rem', color: '#6c757d' }}
                   ></i>
                 )}
               </div>
               <input
                 type="file"
                 id="profile-pic-upload-sidebar"
                 accept="image/*"
                 onChange={handleImageChange}
                 style={{ display: 'none' }}
               />
               <Button
                 variant="outline-primary"
                 size="sm"
                 onClick={() =>
                   document
                     .getElementById('profile-pic-upload-sidebar')
                     .click()
                 }
                 className="mb-2"
               >
                 <i className="bi bi-camera me-1"></i> Update a photo
               </Button>
               {profilePic && (
                 <Button
                   variant="outline-danger"
                   size="sm"
                   onClick={() => setProfilePic(null)}
                   className="w-75"
                 >
                   <i className="bi bi-trash me-1"></i> Remove photo
                 </Button>
               )}
             </div>


             {/* Mobile Profile Picture Section */}
             <div className="d-md-none text-center p-3">
               <div
                 className="rounded-circle overflow-hidden shadow mx-auto d-flex align-items-center justify-content-center mb-3"
                 style={{
                   width: '100px',
                   height: '100px',
                   backgroundColor: '#e9ecef',
                   border: '3px solid #fff',
                 }}
               >
                 {profilePic ? (
                   <img
                     src={profilePic || '/placeholder.svg'}
                     alt="Profile"
                     className="w-100 h-100"
                     style={{ objectFit: 'cover' }}
                   />
                 ) : (
                   <i
                     className="bi bi-person-fill"
                     style={{ fontSize: '3rem', color: '#6c757d' }}
                   ></i>
                 )}
               </div>
               <input
                 type="file"
                 id="profile-pic-upload-mobile"
                 accept="image/*"
                 onChange={handleImageChange}
                 style={{ display: 'none' }}
               />
               <Button
                 variant="outline-primary"
                 size="sm"
                 onClick={() =>
                   document.getElementById('profile-pic-upload-mobile').click()
                 }
                 className="mb-2"
               >
                 <i className="bi bi-camera me-1"></i> Change Photo
               </Button>
               {profilePic && (
                 <Button
                   variant="outline-danger"
                   size="sm"
                   onClick={() => setProfilePic(null)}
                   className="w-75"
                 >
                   <i className="bi bi-trash me-1"></i> Remove Photo
                 </Button>
               )}
             </div>
