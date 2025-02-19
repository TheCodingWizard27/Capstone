const { db } = require("../firebase/firebase");
const admin = require("firebase-admin");

exports.addMessage = async (req, res) => {
  const { threadId, listingId, message } = req.body;
  const sender = req.user.uid;

  // Crete Thread for the conversation if thread id is not present in the post request
  if (!threadId) {
    //If thread is not specified create new thread but before that check if listing exists
    const listingRef = db.collection("listings").doc(listingId);
    const listingDoc = await listingRef.get();

    if (!listingDoc.exists) {
      //If listing does not exist
      return res.status(400).json({ error: "Listing doenot exist" });
    } else {
      const listingData = await listingDoc.data();
      const receiver = listingData.user;

      if (receiver === sender) {
        //If seller is sending message to thyself
        return res
          .status(400)
          .json({ error: "Cannot send message to your own listing" });
      }

      //Create a thread first
      const createdThreadId = await createThread(sender, listingId, receiver);
      if (createdThreadId == null) {
        return res
          .status(400)
          .json({ error: "Cannot send the message to the sender" });
      }

      //Create message
      const createdMessageId = await createMessage(sender, receiver, message);
      if (createdMessageId == null) {
        return res
          .status(400)
          .json({ error: "Cannot send the message to the sender" });
      }

      addMessageToThread(createdThreadId, createdMessageId);
      return res.status(200).json({ message: "Posting Message" });

      ////////////////////////////Handle for real time communication////////////////
    }
  } else {
    //If threadId is present in the post request
    const threadRef = db.collection("threads").doc(threadId);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      //If thread has been deleted
      return res
        .status(400)
        .json({ error: "You cannot message to this listing" });
    } else {
      // If conversation thread already exists push the new message to that thread
      //Check if listing exists
      //Check if the user is already on the thread...
      //Create message

      const threadData = await threadDoc.data();
      const listing_Id = threadData.listing;
      const buyer = threadData.buyer;
      const seller = threadData.seller;

      const listingRef = db.collection("listings").doc(listing_Id);
      const listingDoc = await listingRef.get();

      if (!listingDoc.exists) {
        //If listing does not exist
        return res.status(400).json({ error: "Listing doenot exist" });
      } else {
        //Figure out who is sender and who is receiver
        const receiver = sender == buyer ? seller : buyer;
        const createdMessageId = await createMessage(sender, receiver, message);
        if (createdMessageId == null) {
          return res
            .status(400)
            .json({ error: "Cannot send the message to the sender" });
        }
        addMessageToThread(threadId, createdMessageId);
        return res.status(200).json({ message: "Posting Message" });
        ////////////////////////////Handle for real time communication////////////////
      }
    }
  }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const threadRef = db.collection("threads");

    // Query for threads where the buyer or seller is the current user
    const buyerThreads = await threadRef.where("buyer", "==", userId).get();
    const sellerThreads = await threadRef.where("seller", "==", userId).get();

    let threads = [];

    buyerThreads.forEach((doc) => {
      threads.push({ id: doc.id, ...doc.data() });
    });

    sellerThreads.forEach((doc) => {
      threads.push(threadData);
    });

    res.status(200).json({ threads });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching threads", details: error.message });
  }
};

//This only happens when a buyer messages the seller first. Not the other way round.
const createThread = async (buyerId, listingId, sellerId) => {
  try {
    const createdThread = await db.collection("threads").add({
      buyer: buyerId,
      listing: listingId,
      seller: sellerId,
      messages: [],
    });
    return createdThread.id;
  } catch (error) {
    console.log(`=====Error occured===== ${error}`);
    return null;
  }
};

//Happens when someone sends message to someone
const createMessage = async (sender, receiver, message) => {
  try {
    const createdMessage = await db.collection("messages").add({
      sender,
      receiver,
      message,
      delivered: 0,
    });
    return createdMessage.id;
  } catch (error) {
    console.log(`=====Error occured===== ${error}`);
    return null;
  }
};

const addMessageToThread = async (threadId, messageId) => {
  const threadRef = db.collection("threads").doc(threadId);
  const threadDoc = await threadRef.get();

  if (!threadDoc.exists) {
    console.error("Thread does not exist:", threadId);
    return;
  }

  const threadData = threadDoc.data(); // No need for await
  const messages = threadData.messages || []; // Ensure it's an array

  await threadRef.update({
    messages: [...messages, messageId], // Append new messageId
  });

  console.log("Message added successfully to thread:", threadId);
};

const linkThreadToUsers = async () => {};

const notifySocket = async () => {};

//post processing after saving message in database
//Send data to websocket handler
