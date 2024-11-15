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
router.get("/listings/:id", async (req, res) => {
  try {
    const listingId = req.params.id;
    const listingRef = db.collection("listings").doc(listingId);
    const listingDoc = await listingRef.get();
    if (!listingDoc.exists) {
      return res.status(404).json({ message: "Listing not found" });
    }
    const listingData = listingDoc.data();

    // Fetch similar items and other items by the seller if needed
    const similarItems = await db
      .collection("listings")
      .where("category", "==", listingData.category)
      .limit(5)
      .get();
    const otherItems = await db
      .collection("listings")
      .where("user", "==", listingData.user)
      .limit(5)
      .get();

    res.json({
      ...listingData,
      similarItems: similarItems.docs.map((doc) => doc.data()),
      otherItems: otherItems.docs.map((doc) => doc.data()),
    });
  } catch (error) {
    console.error("Error fetching listing data:", error);
    res.status(500).json({ message: "Error fetching listing data" });
  }
});

module.exports = router;
