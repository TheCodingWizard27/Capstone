const { db, bucket } = require("../firebase/firebase");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid"); // For generating unique file names

// Endpoint to add a new listing
exports.addListing = async (req, res) => {
  try {
    const { title, brand, category, description, price } = req.body;
    const userId = req.user.user_id; // Assuming user is set from `verifyAuthToken` middleware
    const storage = bucket; // Access Firebase Storage bucket

    let picUrls = [];

    // Upload each file to Firebase Storage and get its URL
    if (req.files && req.files.length) {
      const uploadPromises = req.files.map(async (file) => {
        const uniqueFileName = `uploads/${userId}/${uuidv4()}_${
          file.originalname
        }`;
        const fileUpload = storage.file(uniqueFileName);

        await fileUpload.save(file.buffer, {
          contentType: file.mimetype,
        });

        // Get the URL of the uploaded file
        const url = await fileUpload.getSignedUrl({
          action: "read",
          expires: "03-01-2500", // Set a far expiration date
        });

        return url[0]; // URL is returned as an array
      });

      picUrls = await Promise.all(uploadPromises);
    }

    // Save listing data in Firestore
    const newListing = await db.collection("listings").add({
      title,
      brand,
      category,
      description,
      price,
      status: "active",
      user: userId,
      picUrls,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .send({ message: "Listing added successfully", id: newListing.id });
  } catch (error) {
    console.error("Error adding listing:", error);
    res
      .status(500)
      .send({ message: "Error adding listing", error: error.message });
  }
};

// Endpoint to get all listings
exports.getListings = async (req, res) => {
  try {
    const snapshot = await db.collection("listings").get();
    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      status: data.status || "active", // Set default status if not present
    }));

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res
      .status(500)
      .send({ message: "Error fetching listings", error: error.message });
  }
};
// Endpoint to get listings for a specific user
exports.getMyListings = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const snapshot = await db
      .collection("listings")
      .where("user", "==", userId)
      .get();
    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

// Endpoint to get a single listing by ID
exports.getSingleListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listingRef = db.collection("listings").doc(listingId);

    const listingDoc = await listingRef.get();

    if (!listingDoc.exists) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const listingData = listingDoc.data();

    const userRef = db.collection("users").doc(listingData.user);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = userDoc.data();
    listingData.sellerName = userData.userName;
    const listingDataWithId = { ...listingData, id: listingId };

    // Fetch similar items with IDs
    const similarItemsSnapshot = await db
      .collection("listings")
      .where("category", "==", listingData.category)
      .limit(5)
      .get();

    const otherItemsSnapshot = await db
      .collection("listings")
      .where("user", "==", listingData.user)
      .limit(5)
      .get();

    res.json({
      ...listingDataWithId,
      similarItems: similarItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
      otherItems: otherItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    });
  } catch (error) {
    console.error("Error fetching listing data:", error);
    res.status(500).json({ message: "Error fetching listing data" });
  }
};
// Endpoint to search listings by category
exports.getListingsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const snapshot = await db
      .collection("listings")
      .where("category", "==", category)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No listings found in this category" });
    }

    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings by category:", error);
    res.status(500).send({
      message: "Error fetching listings by category",
      error: error.message,
    });
  }
};

// Endpoint for searching listings by title
exports.searchListings = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const listingsRef = db.collection("listings");
    const snapshot = await listingsRef
      .where("title", ">=", query)
      .where("title", "<=", query + "\uf8ff")
      .get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching listings:", error);
    res.status(500).json({ message: "Error searching listings" });
  }
};

// Endpoint to update an existing listing
exports.updateListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const { title, brand, category, description, price } = req.body;
    const userId = req.user.user_id;
    const listingRef = db.collection("listings").doc(listingId);
    const listingDoc = await listingRef.get();

    if (!listingDoc.exists) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listingDoc.data().user !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let picUrls = listingDoc.data().picUrls || [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uniqueFileName = `uploads/${userId}/${uuidv4()}_${
          file.originalname
        }`;
        const fileUpload = bucket.file(uniqueFileName);
        await fileUpload.save(file.buffer, { contentType: file.mimetype });
        const url = await fileUpload.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });
        return url[0];
      });
      const newPicUrls = await Promise.all(uploadPromises);
      picUrls = [...picUrls, ...newPicUrls];
    }

    await listingRef.update({
      title,
      brand,
      category,
      description,
      price,
      picUrls,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(200)
      .json({ message: "Listing updated successfully", id: listingId });
  } catch (error) {
    console.error("Error updating listing:", error);
    res
      .status(500)
      .json({ message: "Error updating listing", error: error.message });
  }
};

// Endpoint to delete a listing
exports.deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user.user_id; // From auth middleware

    // Get the listing document
    const listingRef = db.collection("listings").doc(listingId);
    const listingDoc = await listingRef.get();

    // Check if listing exists
    if (!listingDoc.exists) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const listingData = listingDoc.data();

    // Check if user is authorized to delete this listing
    if (listingData.user !== userId) {
      return res.status(403).json({
        message: "Unauthorized: You can only delete your own listings",
      });
    }

    // Delete images from Firebase Storage if they exist
    if (listingData.picUrls && listingData.picUrls.length > 0) {
      try {
        const deletePromises = listingData.picUrls.map(async (url) => {
          // Extract the file path from the URL
          // URLs typically look like: https://storage.googleapis.com/[bucket]/[filepath]?token=...
          const urlObj = new URL(url);
          const pathWithoutBucket = urlObj.pathname
            .split("/")
            .slice(2)
            .join("/");

          // Delete the file
          const file = bucket.file(decodeURIComponent(pathWithoutBucket));
          await file.delete().catch((err) => {
            console.warn(`Failed to delete file ${pathWithoutBucket}:`, err);
            // Continue even if file deletion fails
          });
        });

        await Promise.all(deletePromises);
      } catch (error) {
        console.error("Error deleting files from storage:", error);
        // Continue with listing deletion even if file deletion fails
      }
    }

    // Delete the listing document from Firestore
    await listingRef.delete();

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res
      .status(500)
      .json({ message: "Error deleting listing", error: error.message });
  }
};

// Endpoint to update a listing's status
exports.updateListingStatus = async (req, res) => {
  try {
    const listingId = req.params.id;
    const { status } = req.body;
    const userId = req.user.user_id;

    // Validate status
    if (!status || (status !== "active" && status !== "inactive")) {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'active' or 'inactive'." });
    }

    const listingRef = db.collection("listings").doc(listingId);
    const listingDoc = await listingRef.get();

    // Check if listing exists
    if (!listingDoc.exists) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if user is authorized to update this listing
    if (listingDoc.data().user !== userId) {
      return res.status(403).json({
        message: "Unauthorized: You can only update your own listings",
      });
    }

    // Update only the status field
    await listingRef.update({
      status: status,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      message: `Listing status updated to ${status} successfully`,
      id: listingId,
    });
  } catch (error) {
    console.error("Error updating listing status:", error);
    res.status(500).json({
      message: "Error updating listing status",
      error: error.message,
    });
  }
};
