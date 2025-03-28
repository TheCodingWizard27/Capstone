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

//fetchiing by my listings
router.get("/my-listings/:userId", listingController.getMyListings);

router.put(
  "/updateListing/:id",
  verifyAuthToken,
  upload,
  listingController.updateListing
);
router.delete(
  "/listings/:id",
  verifyAuthToken,
  listingController.deleteListing
);

router.delete(
  "/deleteImage/:id",
  verifyAuthToken,
  listingController.deleteImage
);

router.put(
  "/listings/:id/status",
  verifyAuthToken,
  listingController.updateListingStatus
);
module.exports = router;
