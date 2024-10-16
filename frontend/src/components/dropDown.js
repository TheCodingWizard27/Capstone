import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const DropDown = () => {
  const [searchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState(null);

  // On component mount, get the selected value from query params
  useEffect(() => {
    const value = searchParams.get('selectedvalue');
    if (value) {
      setSelectedValue(value);
    }
  }, [searchParams]);

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="primaryAccent">
        {selectedValue ? `Selected: ${selectedValue}` : 'Category'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/category?selectedvalue=action-1">
          Action
        </Dropdown.Item>
        <Dropdown.Item href="/category?selectedvalue=action-2">
          Another action
        </Dropdown.Item>
        <Dropdown.Item href="/category?selectedvalue=action-3">
          Something else
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;


