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
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uniqueFileName = `uploads/${userId}/${uuidv4()}_${file.originalname}`;
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
      user: userId,
      picUrls,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send({ message: "Listing added successfully", id: newListing.id });
  } catch (error) {
    console.error("Error adding listing:", error);
    res.status(500).send({ message: "Error adding listing", error: error.message });
  }
};

// Endpoint to get all listings
exports.getListings = async (req, res) => {
  try {
    const snapshot = await db.collection("listings").get();
    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send({ message: "Error fetching listings", error: error.message });
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
      similarItems: similarItemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      otherItems: otherItemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
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
      return res.status(404).json({ message: "No listings found in this category" });
    }

    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings by category:", error);
    res.status(500).send({ message: "Error fetching listings by category", error: error.message });
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
        const uniqueFileName = `uploads/${userId}/${uuidv4()}_${file.originalname}`;
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

    res.status(200).json({ message: "Listing updated successfully", id: listingId });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Error updating listing", error: error.message });
  }
};
