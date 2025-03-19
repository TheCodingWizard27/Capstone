import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DropUser = () => {
  const auth = getAuth();
  const [searchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState(null);
  const [smallDisplay, setSmallDisplay] = useState(window.innerWidth < 768);

  // On component mount, get the selected value from query params
  useEffect(() => {
    const value = searchParams.get('selectedvalue');
    if (value) {
      setSelectedValue(value);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => setSmallDisplay(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Log out function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        // Redirect to login page or any other page after logout
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('An error happened during sign out:', error);
      });
  };

  return (
    <>
      {!smallDisplay ? (
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="primaryAccent">
            <FaUser size={20} className="me-2" />
            {selectedValue ? `Selected: ${selectedValue}` : ''}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/accountInfo">My Profile</Dropdown.Item>
            <Dropdown.Item href="/transaction">Transactions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        // Show Plain Links for Small screens
        <div className="d-flex flex-column">
          <Link
            to="/accountInfo"
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
          >
            My Profile
          </Link>
          <Link
            to="/transaction"
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
          >
            Transactions
          </Link>

          <Link
            to="/transaction"
            className="d-flex align-items-center mb-3 text-light"
            style={{ textDecoration: 'none', fontSize: '1.25rem' }}
            onClick={handleLogout}
          >
            Log Out
          </Link>
        </div>
      )}
    </>
  );
};

export default DropUser;
