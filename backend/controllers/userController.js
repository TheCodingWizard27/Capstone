const { auth, db } = require("../firebase/firebase");


exports.addUser = async (req, res) => {
  const { user_id, email } = req.user;

  try {
    // Check if the user already exists in Firestore
    const userSnapshot = await db
      .collection("users")
      .where("uid", "==", user_id)
      .get();

    if (!userSnapshot.empty) {
      return res.status(409).send("User already exists in Firestore");
    }

    // Add user to Firestore if they don't already exist
    await db.collection("users").add({
      uid: user_id,
      email: email,
      userName: email.split("@")[0], // Use provided name or derive from email
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
