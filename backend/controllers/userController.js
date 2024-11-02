const { auth, db } = require("../firebase/firebase");

exports.addUser = async (req, res) => {
  const { uid, name } = req.body;

  // The `verifyAuthToken` middleware already verifies the token and attaches `decodedToken` to `req.user`
  const decodedToken = req.user;

  try {
    // Check if the decoded token's UID matches the provided UID
    if (decodedToken.uid !== uid) {
      return res.status(403).send("Forbidden: Invalid token for the given UID");
    }

    console.log(`User session verified: ${decodedToken.email}`);

    // Check if the user exists in Firebase Authentication
    const userRecord = await auth.getUser(uid);
    console.log(`User exists: ${userRecord.email}`);

    // Check if the user already exists in Firestore
    const userSnapshot = await db
      .collection("users")
      .where("uid", "==", userRecord.uid)
      .get();

    if (!userSnapshot.empty) {
      return res.status(409).send("User already exists in Firestore");
    }

    // Add user to Firestore if they don't already exist
    await db.collection("users").add({
      uid: userRecord.uid,
      email: userRecord.email,
      name: name || userRecord.email.split("@")[0], // Use provided name or derive from email
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
