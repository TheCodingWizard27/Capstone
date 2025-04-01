const { db } = require("../firebase/firebase");

exports.getAllCategoriesInfo = async (req, res) => {
  try {
    const snapshot = await db.collection("categories").get();
    const categories = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories info:", error);
    res.status(500).json({ message: "Failed to fetch categories info" });
  }
};

exports.getCategoryNames = async (req, res) => {
  try {
    const snapshot = await db.collection("categories").get();
    const categoryNames = snapshot.docs.map((doc) => doc.data().name);
    res.status(200).json(categoryNames);
  } catch (error) {
    console.error("Error fetching category names:", error);
    res.status(500).json({ message: "Failed to fetch category names" });
  }
};
