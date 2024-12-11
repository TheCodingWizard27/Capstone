const admin = require("firebase-admin");

exports.addMessage = async (req, res) => {
  const { listing, message } = req;

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
};
