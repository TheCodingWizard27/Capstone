const { db } = require("../firebase/firebase");
const admin = require("firebase-admin"); // Make sure admin SDK is imported

exports.addUser = async (req, res) => {
  const { user_id, email } = req.user;

  try {
    // Check if the user already exists in Firestore
    const userSnapshot = await db.collection("users").doc(user_id).get();

    if (userSnapshot.exists) {
      return res.status(409).send("User already exists in Firestore");
    }

    // Add user to Firestore using the uid as the document ID
    await db
      .collection("users")
      .doc(user_id)
      .set({
        uid: user_id,
        email: email,
        userName: email.split("@")[0], // Derive the username from the email
        createdAt: admin.firestore.FieldValue.serverTimestamp(), // Timestamp for creation
        modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.status(201).send("User added successfully");
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send("User not found in Firebase Authentication");
    } else {
      res.status(500).send(`Error: ${error.message}`);
    }
  }
};
