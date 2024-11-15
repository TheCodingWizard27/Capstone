const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const validateListing = require("../middlewares/listingDataValidator");
const listingController = require("../controllers/listingController");
const multer = require("multer");
const { db } = require("../firebase/firebase");

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/addListing",
  verifyAuthToken,
  upload.array("files", 5),
  validateListing,
  listingController.addListing
);

router.get("/getListings", listingController.getListings);

// Fetch listing by ID
router.get("/listings/:id", listingController.getSingleListing);

module.exports = router;
