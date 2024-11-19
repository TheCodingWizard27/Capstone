import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import NavBar from "../components/navBar";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "bought", name: "Durga", date: "10/01/2024" },
    { id: 2, type: "bought", name: "Devi", date: "10/01/2024" },
    { id: 3, type: "bought", name: "Sita", date: "10/01/2024" },
    { id: 4, type: "bought", name: "Ram", date: "10/01/2024" },
    { id: 5, type: "sold", name: "Hari", date: "10/01/2024" },
    { id: 6, type: "sold", name: "Hari", date: "10/01/2024" },
  ]);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortType === "date") return new Date(a.date) - new Date(b.date);
      return a.name.localeCompare(b.name);
    });
    setTransactions(sortedTransactions);
  };

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  const boughtCount = transactions.filter((t) => t.type === "bought").length;
  const soldCount = transactions.filter((t) => t.type === "sold").length;

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Row className="align-items-center mb-4">
          <Col xs={6} sm={6} md={4}>
            <h2>Transaction History</h2>
          </Col>
          <Col xs={6} sm={6} md={8} className="d-flex justify-content-end gap-3">
            <Dropdown>
              <Dropdown.Toggle variant="primary">Sort By</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("date")}>
                  Date
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("name")}>
                  Name
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="primary">Filters</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilterChange("all")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange("bought")}>
                  Bought
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange("sold")}>
                  Sold
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          <Col xs={6} className="text-center">
            <div
              style={{
                backgroundColor: "#0F9E48",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h5>Total Items Bought:</h5>
              <p>{boughtCount}</p>
            </div>
          </Col>
          <Col xs={6} className="text-center">
            <div
              style={{
                backgroundColor: "#D62323",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h5>Total Items Sold:</h5>
              <p>{soldCount}</p>
            </div>
          </Col>
        </Row>

        <div className="mt-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              style={{
                backgroundColor:
                  transaction.type === "bought" ? "#0F9E48" : "#D62323",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {transaction.type === "bought"
                  ? `Seller Name: ${transaction.name}`
                  : `Buyer Name: ${transaction.name}`}
                <br />
                <small>{transaction.type === "bought" ? "Bought" : "Sold"}: {transaction.date}</small>
              </div>
              <img
                src="https://via.placeholder.com/50"
                alt="item"
                style={{ borderRadius: "5px" }}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default TransactionPage;
