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
const session = require("express-session");

const app = express();
const PORT = 8000;

//For session management
const adminSession = session({
  secret: process.env.SESSION_SECRET, // put this in .env
  resave: false,
  saveUninitialized: false,
  rolling: true, // refresh session on every request
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour session duration
});
// For cross origin
app.use(cors({
  origin: 'http://localhost:3000', // Explicitly allow your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
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
app.use("/admin", adminSession, adminRoutes);

// Start the server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Setup web socket
setupWebSocket(server);
