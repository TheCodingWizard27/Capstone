const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const validateListing = require("../middlewares/listingDataValidator");
const listingController = require("../controllers/listingController");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/addListing",
  validateListing,
  upload.array("files", 5),
  listingController.addListing
);

router.get("/getListing");

module.exports = router;
