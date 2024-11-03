const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listing");

const app = express();
const PORT = 8000;

//For cross origin
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", listingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
