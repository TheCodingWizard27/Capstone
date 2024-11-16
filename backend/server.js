const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listing");

const setupWebSocket = require("./messageHandler");

const app = express();
const PORT = 8000;

//For cross origin
app.use(cors());

//For logging requests
app.use(morgan("dev"));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", listingRoutes);

app.get("/api/categories", (req, res) => {
  const categories = [
    "Furniture",
    "Books",
    "Electronics",
    "Clothes",
    "Kitchen",
    "Miscellaneous",
  ];

  res.status(200).send(categories);
});

// Start the server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Setup web socket
setupWebSocket(server);
