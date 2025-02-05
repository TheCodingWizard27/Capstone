const admin = require("firebase-admin");

exports.addMessage = async (req, res) => {
  const { listing, message } = req.body;

  console.log(message);
};


//preprocessing before saving message
// Crete Thread for the conversation if threadid is not present in the post request Threadid = buyer-listing-seller
// If conversation thread already exists push the new message to that thread
//If conversation thread doesnot exist make a new convesation thread


//post processing after saving message in database
//Send data to websocket handler

