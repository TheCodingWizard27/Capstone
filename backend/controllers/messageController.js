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

      //check if thread already exists
      const threadRef = db.collection("threads");
      const buyerThreads = await threadRef.where("buyer", "==", sender).get();
      const sellerThreads = await threadRef.where("seller", "==", sender).get();

      //Create a thread if it does not exist
      if (buyerThreads.empty && sellerThreads.empty) {
        threadId = await createThread(sender, listingId, receiver);
        if (threadId == null) {
          return res
            .status(400)
            .json({ error: "Cannot send the message to the sender" });
        }
      } else {
        threadId = buyerThreads.empty
          ? sellerThreads.docs[0].id
          : buyerThreads.docs[0].id;
      }

      //Create message
      const createdMessageId = await createMessage(
        sender,
        receiver,
        message,
        threadId
      );
      if (createdMessageId == null) {
        return res
          .status(400)
          .json({ error: "Cannot send the message to the sender" });
      }

      addMessageToThread(threadId, createdMessageId);
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
        const createdMessageId = await createMessage(
          sender,
          receiver,
          message,
          threadId
        );
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

exports.getMessageByThread = async (req, res) => {
  try {
    const threadId = req.params.id;
    const userId = req.user.user_id;
    const messageRef = db.collection("messages");
    const messageDocs = await messageRef
      .where("threadId", "==", threadId)
      .get();

    const messages = messageDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ error: "Error fetching messages", details: error.message });
  }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const threadRef = db.collection("threads");
    const userRef = db.collection("users");

    // Query for threads where the buyer or seller is the current user
    const buyerThreads = await threadRef.where("buyer", "==", userId).get();
    const sellerThreads = await threadRef.where("seller", "==", userId).get();

    let threadDocs = [];

    // Combine buyer and seller threads
    buyerThreads.forEach((doc) => {
      threadDocs.push({
        threadId: doc.id,
        seller: doc.data().seller,
        myRole: "buyer",
      });
    });

    sellerThreads.forEach((doc) => {
      threadDocs.push({
        threadId: doc.id,
        buyer: doc.data().buyer,
        myRole: "seller",
      });
    });

    // Fetch user information for each thread
    const userPromises = threadDocs.map(async (thread) => {
      let userIdToFetch =
        thread.myRole === "buyer" ? thread.seller : thread.buyer;

      if (userIdToFetch) {
        try {
          const userDoc = await userRef.doc(userIdToFetch).get();
          return {
            ...thread,
            otherParty: userDoc.exists
              ? userDoc.data().userName
              : "Unknown User",
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
          return { ...thread, userName: "Error fetching user" };
        }
      }
      return thread;
    });

    // Wait for all user data fetches to resolve
    const resolvedThreads = await Promise.all(userPromises);

    res.status(200).json({ threads: resolvedThreads });
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
const createMessage = async (sender, receiver, message, threadId) => {
  try {
    const createdMessage = await db.collection("messages").add({
      threadId,
      sender,
      receiver,
      message,
      delivered: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
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
