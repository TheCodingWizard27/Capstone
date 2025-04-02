const { db, auth } = require("../firebase/firebase");
const admin = require("firebase-admin"); // Firebase Admin SDK

// Add a new user to Firestore
exports.addUser = async (req, res) => {
  const { user_id, email } = req.user;

  try {
    // Check if the user already exists in Firestore
    const userSnapshot = await db.collection("users").doc(user_id).get();

    if (userSnapshot.exists) {
      return res.status(409).send("User already exists in Firestore");
    }

    // Add user to Firestore
    await db.collection("users").doc(user_id).set({
      uid: user_id,
      email: email,
      userName: email.split("@")[0], // Username derived from email
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};


// Update user information with photo upload
exports.updateUserInfo = async (req, res) => {
  const { user_id } = req.user;
  const { fullName, bio, email, phoneNumber } = req.body;
  const file = req.file; // Uploaded file

  try {
    let updateData = {}; // Store only the fields that need updating

    // Upload new profile picture if provided
    if (file) {
      const fileName = `profile_pictures/${user_id}_${Date.now()}`;
      const fileUpload = admin.storage().bucket().file(fileName);

      await fileUpload.save(file.buffer, { metadata: { contentType: file.mimetype } });

      // Generate a signed URL for access
      const [url] = await fileUpload.getSignedUrl({ action: "read", expires: "01-01-2030" });
      updateData.photoURL = url; // Save the new photo URL
    }

    // Update only fields that are provided (keep existing values)
    if (fullName) updateData.fullName = fullName;
    if (bio) updateData.bio = bio;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    updateData.modifiedAt = admin.firestore.FieldValue.serverTimestamp();

    await db.collection("users").doc(user_id).update(updateData);

    res.status(200).send("User information updated successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

// Change user password (for email/password users only)
exports.changePassword = async (req, res) => {
  const { user_id } = req.user;
  const { newPassword } = req.body;

  try {
    const user = await auth.getUser(user_id);

    // Ensure the user is using email/password authentication
    if (user.providerData.some(provider => provider.providerId !== "password")) {
      return res.status(400).send("Password change is only allowed for email/password users.");
    }

    await auth.updateUser(user_id, { password: newPassword });

    res.status(200).send("Password updated successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
// Get user information
exports.getUserInfo = async (req, res) => {
  const { user_id } = req.user;

  try {
    const userSnapshot = await db.collection("users").doc(user_id).get();

    if (!userSnapshot.exists) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(userSnapshot.data());
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
