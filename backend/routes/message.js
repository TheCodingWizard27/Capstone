const express = require("express");
const router = express.Router();
const verifyAuthToken = require("../middlewares/authMiddleware");
const messageController = require("../controllers/messageController");

//Post message
router.post("/sendMessage", verifyAuthToken, messageController.addMessage);
router.get("/allThreadMessages",verifyAuthToken,messageController.getThreadMessages)

// // Fetch conversation threads
// router.get("/getAllThreads", messageController.getAllThreads);

// //Fetch conversation by threads
// router.get("/getThreadMessage", messageController.getMessageByThread);

module.exports = router;
