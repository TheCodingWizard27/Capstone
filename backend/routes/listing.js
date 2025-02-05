const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const validateListing = require("../middlewares/listingDataValidator");
const listingController = require("../controllers/listingController");
const multer = require("multer");
const { getListingsByCategory } = require("../controllers/listingController");

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() }).any();

router.post(
  "/addListing",
  verifyAuthToken,
  upload,
  validateListing,
  listingController.addListing
);

router.get("/getListings", listingController.getListings);

// Fetch listing by ID
router.get("/listings/:id", listingController.getSingleListing);

router.get("/search", listingController.searchListings);
router.get("/listings/category/:category", getListingsByCategory);
module.exports = router;
