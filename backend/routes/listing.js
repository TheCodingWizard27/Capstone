const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const validateListing = require("../middlewares/listingDataValidator");
const listingController = require("../controllers/listingController");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/addListing",
  verifyAuthToken,
  upload.array("files", 5),
  validateListing,
  listingController.addListing
);

router.get("/getListing");

module.exports = router;
