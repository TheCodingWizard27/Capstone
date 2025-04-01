const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listing");
const messageRoutes = require("./routes/message");
const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/categoryRoutes");
const { setupWebSocket } = require("./messageHandler");

const app = express();
const PORT = 8000;

// For cross origin
app.use(cors());

// For logging requests
app.use(morgan("dev"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "admin/layout");

// Set layout for admin routes
app.use("/admin", (req, res, next) => {
  res.locals.layout = "admin/layout";
  next();
});

// Routes
app.use("/api", userRoutes);
app.use("/api", listingRoutes);
app.use("/api", messageRoutes);
app.use("/api", categoryRoutes);
app.use("/admin", adminRoutes);

// Start the server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Setup web socket
setupWebSocket(server);
