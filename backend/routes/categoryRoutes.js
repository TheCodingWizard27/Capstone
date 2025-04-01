const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/categoriesInfo", categoryController.getAllCategoriesInfo);
router.get("/categories/list", categoryController.getCategoryNames);

module.exports = router;
