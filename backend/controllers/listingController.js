const { db } = require("../firebase/firebase");
const admin = require("firebase-admin"); // Make sure admin SDK is imported

exports.addListing = async (req, res) => {
  try {
    const { listing, brand, category, description } = req.body;

    // Log uploaded files if any
    if (req.files) {
      console.log("Uploaded files:", req.files);
    }

    const picUrls = [
      "https://picsum.photos/200",
      "https://picsum.photos/200",
      "https://picsum.photos/200",
      "https://picsum.photos/200",
      "https://picsum.photos/200",
    ];

    // Add user to Firestore if they don't already exist
    await db.collection("listings").add({
      listing: listing,
      brand: brand,
      description: description, // Use provided name or derive from email
      category: category,
      user: req.user.user_id,
      picUrls: picUrls,
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Timestamp for creation
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send("Listing added successfully");
  } catch (error) {
    console.error("Error adding listing:", error);
    res
      .status(500)
      .send({ message: "Error adding listing", error: error.message });
  }
};

exports.getListings = async (req, res) => {};

exports.getSingleListing = async (req, res) => {};
