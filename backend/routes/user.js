const express = require("express");
const multer = require("multer");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

router.post("/addUser", verifyAuthToken, userController.addUser);
router.put("/updateUserInfo", verifyAuthToken, upload.single("photo"), userController.updateUserInfo);
router.put("/changePassword", verifyAuthToken, userController.changePassword);
router.get("/userInfo", verifyAuthToken, userController.getUserInfo);

module.exports = router;
