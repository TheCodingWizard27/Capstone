import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { getAuth, signOut } from "firebase/auth";
import { FaUser } from 'react-icons/fa';

const DropUser = () => {
  const auth = getAuth();
  const [searchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState(null);

  // On component mount, get the selected value from query params
  useEffect(() => {
    const value = searchParams.get('selectedvalue');
    if (value) {
      setSelectedValue(value);
    }
  }, [searchParams]);

  // Log out function
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
      // Redirect to login page or any other page after logout
      window.location.href = '/'; 
    }).catch((error) => {
      console.error('An error happened during sign out:', error);
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="primaryAccent">
      <FaUser size={20} className="me-2" />
        {selectedValue ? `Selected: ${selectedValue}` : ''}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/accountInfo">
          My Profile
        </Dropdown.Item>
        <Dropdown.Item href="/category?selectedvalue=action-2">
          My Listings
        </Dropdown.Item>
        <Dropdown.Item href="/transaction">
          Transactions
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropUser;
