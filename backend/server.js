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
app.use("/admin", adminRoutes);

app.get("/api/categoriesInfo", (req, res) => {
  const categories = [
    {
      name: "Furniture",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Ffurniture1.jpg?alt=media&token=7429e873-84f8-4b34-b425-7746219364a3",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Ffurniture2.webp?alt=media&token=055ad1a0-53e7-43a7-b4c5-6f7779df60b6",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Ffurniture3.jpeg?alt=media&token=36e1a8a4-8fad-4bac-b869-070501eece50",
      ],
    },
    {
      name: "Books",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fbook1.jpg?alt=media&token=8e1db27c-b6cf-42b1-a842-06fb075b5934",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fbooks2.webp?alt=media&token=e8386532-1dcf-4bc8-8024-c5c27dab18ab2.jpg",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fbooks3.jpg?alt=media&token=f8836a9c-2f24-4843-9f00-0a490fc2a3a2",
      ],
    },
    {
      name: "Electronics",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Ftv2.jpeg?alt=media&token=f6694bae-c59f-4537-b818-45a558cc6c9b",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2FKitchen2.jpg?alt=media&token=a61b56ea-ade5-4bc3-96e2-371e6a758668",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fmisc3.jpg?alt=media&token=dc6c6883-0939-48cf-8049-d742a96f07db",
      ],
    },
    {
      name: "Clothing",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fcloth2.jpeg?alt=media&token=4b0c2375-375a-4ee9-9f7a-e4e73d8ffe12",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fcloth1.jpeg?alt=media&token=a74f7f80-5dce-4300-b084-ba9fd2d6f808",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fcloth%202.jpeg?alt=media&token=f0de7d41-63e1-44e0-a744-034231c3c05a",
      ],
    },
    {
      name: "Kitchen",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2FKitchen1.jpg?alt=media&token=b0f87872-2603-4950-a95c-6cddef45185c",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2FKitchen2.jpg?alt=media&token=a61b56ea-ade5-4bc3-96e2-371e6a758668",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2FKitchen3.jpg?alt=media&token=9deb8bba-7b99-451d-bd60-c573025a5b6f",
      ],
    },
    {
      name: "Miscellaneous",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fmisc1.jpg?alt=media&token=a8558c0d-7fdd-4d54-8d77-c527ec85f276",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fmisc2.jpg?alt=media&token=6cce3cae-6619-44b5-afdc-e46327ff26d5",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fmisc3.jpg?alt=media&token=dc6c6883-0939-48cf-8049-d742a96f07db",
      ],
    },
  ];

  res.status(200).send(categories);
});

app.get("/api/categories/list", (req, res) => {
  const categories = [
    "Furniture",
    "Books",
    "Electronics",
    "Clothing",
    "Kitchen",
    "Miscellaneous",
  ];
  res.status(200).send(categories);
});

// Start the server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Setup web socket
setupWebSocket(server);
