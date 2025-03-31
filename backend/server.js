const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listing");
const messageRoutes = require("./routes/message");
const adminRoutes = require('./routes/admin');
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

// Set up static files directory
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "admin/layout");

// Set layout for admin routes
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin/layout';
  next();
});

// Routes
app.use("/api", userRoutes);
app.use("/api", listingRoutes);
app.use("/api", messageRoutes);
app.use('/admin', adminRoutes);

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
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2FBooks1.jpg?alt=media&token=26973235-640d-4953-bdc7-cfaf6b5d4ee2",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2FBooks.jpeg?alt=media&token=15aae304-a8f6-4e24-8259-bd8658260f7b",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fbooks2.jpeg?alt=media&token=12e21a97-27e0-475f-82c3-d401bb35725d",
      ],
    },
    {
      name: "Electronics",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Felectronics.jpeg?alt=media&token=8bcfde57-fefc-48e7-a0f5-1e18520d3b7b",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Felectronics2.webp?alt=media&token=c6e226da-6097-49be-afc5-50ff0cf41628",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Felectronics3.jpeg?alt=media&token=68d79452-463d-48d7-bc85-6784db5b5a65",
      ],
    },
    {
      name: "Clothing",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fcloth1.jpeg?alt=media&token=a74f7f80-5dce-4300-b084-ba9fd2d6f808",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fcloth%202.jpeg?alt=media&token=f0de7d41-63e1-44e0-a744-034231c3c05a",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fclothing3.jpg?alt=media&token=6aa93bae-3fd4-458a-a79e-54710b9cf399",
      ],
    },
    {
      name: "Kitchen",
      photos: [
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fkitchenware1.jpeg?alt=media&token=cc71263b-f27c-44b8-a3d1-270abf7629f7",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fkitchenware2.jpg?alt=media&token=169b378e-2eb1-4f93-94ce-43e3eeaa1a9c",
        "https://firebasestorage.googleapis.com/v0/b/shop-simplify.firebasestorage.app/o/categoryImages%2Fkitchenware.jpeg?alt=media&token=9a40cacc-2796-4d5f-acd9-d2a3ea6d9e24",
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