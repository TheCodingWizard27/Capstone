const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const validateListing = require("../middlewares/listingDataValidator");
const listingController = require("../controllers/listingController");
const multer = require("multer");
const { getListingsByCategory } = require("../controllers/listingController");

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() }).any();

// Add listing route
router.post(
  "/addListing",
  verifyAuthToken,
  upload,
  validateListing,
  listingController.addListing
);

router.post('/reportListing/:id', verifyAuthToken, listingController.reportListing);

// Get all listings
router.get("/getListings", listingController.getListings);

// Fetch listing by ID
router.get("/listings/:id", listingController.getSingleListing);

// Search listings
router.get("/search", listingController.searchListings);

// Get listings by category
router.get("/listings/category/:category", getListingsByCategory);

// Get user's listings
router.get("/my-listings/:userId", listingController.getMyListings);

// Update listing route
router.put(
  "/updateListing/:id",
  verifyAuthToken,
  upload,
  listingController.updateListing
);

// Delete listing route
router.delete("/listings/:id", verifyAuthToken, listingController.deleteListing);

// Update listing status route
router.put("/listings/:id/status", verifyAuthToken, listingController.updateListingStatus);

module.exports = router;
