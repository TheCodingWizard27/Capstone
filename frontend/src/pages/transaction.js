import { useState } from 'react';
import { Container, Row, Col, Dropdown, Badge, Card } from 'react-bootstrap';
import { ArrowDown, ArrowUp, Filter, SortDesc } from 'lucide-react';
import NavBar from '../components/navBar';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'bought', name: 'Durga', date: '10/01/2024' },
    { id: 2, type: 'bought', name: 'Devi', date: '10/01/2024' },
    { id: 3, type: 'bought', name: 'Sita', date: '10/01/2024' },
    { id: 4, type: 'bought', name: 'Ram', date: '10/01/2024' },
    { id: 5, type: 'sold', name: 'Hari', date: '10/01/2024' },
    { id: 6, type: 'sold', name: 'Hari', date: '10/01/2024' },
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortType === 'date') return new Date(a.date) - new Date(b.date);
      return a.name.localeCompare(b.name);
    });
    setTransactions(sortedTransactions);
  };

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  const boughtCount = transactions.filter((t) => t.type === 'bought').length;
  const soldCount = transactions.filter((t) => t.type === 'sold').length;

  return (
    <>
      <NavBar />
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col xs={12} md={6}>
            <h2 className="fw-bold mb-0">Transaction History</h2>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-md-end gap-2 mt-3 mt-md-0"
          >
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                className="d-flex align-items-center"
              >
                <SortDesc size={16} className="me-2" />
                {sortBy === 'date' ? 'Sort by Date' : 'Sort by Name'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  active={sortBy === 'date'}
                  onClick={() => handleSortChange('date')}
                >
                  Date
                </Dropdown.Item>
                <Dropdown.Item
                  active={sortBy === 'name'}
                  onClick={() => handleSortChange('name')}
                >
                  Name
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                className="d-flex align-items-center"
              >
                <Filter size={16} className="me-2" />
                {filter === 'all'
                  ? 'All Transactions'
                  : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Only`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  active={filter === 'all'}
                  onClick={() => handleFilterChange('all')}
                >
                  All Transactions
                </Dropdown.Item>
                <Dropdown.Item
                  active={filter === 'bought'}
                  onClick={() => handleFilterChange('bought')}
                >
                  Bought Only
                </Dropdown.Item>
                <Dropdown.Item
                  active={filter === 'sold'}
                  onClick={() => handleFilterChange('sold')}
                >
                  Sold Only
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="mb-4 g-3">
          <Col sm={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body
                className="d-flex flex-column align-items-center"
                style={{
                  backgroundColor: 'rgba(15, 158, 72, 0.1)',
                  borderRadius: '0.375rem',
                }}
              >
                <div className="d-flex align-items-center mb-2">
                  <ArrowDown size={24} className="me-2 text-success" />
                  <h5 className="fw-bold mb-0">Items Bought</h5>
                </div>
                <h2 className="display-4 fw-bold text-success mb-0">
                  {boughtCount}
                </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body
                className="d-flex flex-column align-items-center"
                style={{
                  backgroundColor: 'rgba(214, 35, 35, 0.1)',
                  borderRadius: '0.375rem',
                }}
              >
                <div className="d-flex align-items-center mb-2">
                  <ArrowUp size={24} className="me-2 text-danger" />
                  <h5 className="fw-bold mb-0">Items Sold</h5>
                </div>
                <h2 className="display-4 fw-bold text-danger mb-0">
                  {soldCount}
                </h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-4">
          {filteredTransactions.length === 0 ? (
            <Card className="text-center p-5 border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-muted">No transactions found</h5>
              </Card.Body>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="mb-3 border-0 shadow-sm transition-all hover-lift"
                style={{
                  borderLeft: `4px solid ${
                    transaction.type === 'bought' ? '#0F9E48' : '#D62323'
                  }`,
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                <Card.Body className="d-flex justify-content-between align-items-center p-3">
                  <div>
                    <div className="d-flex align-items-center mb-1">
                      <Badge
                        bg={
                          transaction.type === 'bought' ? 'success' : 'danger'
                        }
                        className="me-2"
                      >
                        {transaction.type === 'bought' ? 'BOUGHT' : 'SOLD'}
                      </Badge>
                      <span className="text-muted small">
                        {transaction.date}
                      </span>
                    </div>
                    <h5 className="mb-0 fw-semibold">
                      {transaction.type === 'bought' ? 'Seller: ' : 'Buyer: '}
                      <span className="fw-bold">{transaction.name}</span>
                    </h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="item"
                      className="rounded shadow-sm"
                      style={{
                        objectFit: 'cover',
                        height: '50px',
                        width: '50px',
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>

      <style jsx>{`
        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default TransactionPage;
