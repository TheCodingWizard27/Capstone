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
const session = require("express-session");

const cacheResponse = require("./utils/cache");

const app = express();
app.use(express.static("public"));

// Set the port dynamically from environment variables (for Vercel) or default to 8000
const PORT = process.env.PORT || 8000;

// For session management
const adminSession = session({
  secret: process.env.SESSION_SECRET, // set this in your .env file
  resave: false,
  saveUninitialized: false,
  rolling: true, // refresh session on every request
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour session duration
});



// Handle CORS (allow requests from your frontend URLs)
const allowedOrigins = ["*"]; // Local development URL

// CORS Middleware to allow cross-origin requests
app.use(
  cors({
    origin: allowedOrigins[0], // Dynamically set based on environment
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Additional headers for preflight request
    methods: "GET, POST, PUT, DELETE, OPTIONS", // Allow specific HTTP methods
  })
);

// For logging requests
app.use(morgan("dev"));

// Middleware for parsing request bodies
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

// Middleware to set CORS headers for all responses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Start the server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
