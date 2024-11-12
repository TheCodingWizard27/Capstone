const { db } = require("../firebase/firebase");
const admin = require("firebase-admin");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // For generating unique file names

exports.addListing = async (req, res) => {
  try {
    const { title, brand, category, description, price } = req.body;
    const userId = req.user.user_id; // Assuming user is set from `verifyAuthToken` middleware
    const storage = admin.storage().bucket(); // Access Firebase Storage bucket

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

// Assuming we're listing all listings in Firestore collection
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
