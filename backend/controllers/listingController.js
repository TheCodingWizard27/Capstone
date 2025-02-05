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
    await db.collection("listings").add({
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

    res.status(201).send("Listing added successfully");
  } catch (error) {
    console.error("Error adding listing:", error);
    res
      .status(500)
      .send({ message: "Error adding listing", error: error.message });
  }
};
exports.getListingsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Get the category from URL params

    // Fetch listings where the category matches the one passed in the URL
    const snapshot = await db.collection("listings").where("category", "==", category).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: `No listings found for the category: ${category}` });
    }

    // Map through the snapshot and format the listings
    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(listings); // Send the listings as JSON
  } catch (error) {
    console.error("Error fetching listings by category:", error);
    res.status(500).json({ message: "Error fetching listings by category", error: error.message });
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
    res
      .status(500)
      .send({ message: "Error fetching listings", error: error.message });
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
};

// Endpoint to search listings by category (NEW METHOD)
exports.getListingsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Category from URL parameters

    // Query Firestore to fetch listings that match the category
    const snapshot = await db
      .collection("listings")
      .where("category", "==", category) // Match documents where 'category' field matches
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No listings found in this category" });
    }

    // Map the results to return the data
    const listings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(listings); // Send the listings as JSON
  } catch (error) {
    console.error("Error fetching listings by category:", error);
    res.status(500).send({ message: "Error fetching listings by category", error: error.message });
  }
};

// Endpoint for searching listings by title (used for search functionality)
exports.searchListings = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

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
