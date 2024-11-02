const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.post("/addUser", verifyAuthToken, userController.addUser);

module.exports = router;
