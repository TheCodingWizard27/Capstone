const admin = require("firebase-admin");

exports.addMessage = async (message) => {
  const { buyer, seller, listing, thread } = message;

  //Check if seller-listing-buyer
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
