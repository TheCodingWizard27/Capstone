const { db } = require("../firebase/firebase");
const admin = require("firebase-admin");

exports.createThread = async (req, res) => {
  try {
    const { listingId } = req.body;
    const buyer = req.user.uid;

    if (!listingId) {
      return res.status(400).json({ error: "Listing ID is required" });
    }

    const listingRef = db.collection("listings").doc(listingId);
    const listingDoc = await listingRef.get();

    if (!listingDoc.exists) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const listingData = listingDoc.data();
    const seller = listingData.user;

    if (seller === buyer) {
      return res
        .status(400)
        .json({ error: "Cannot send a message to your own listing" });
    }

    // Check if a thread already exists between the buyer and the listing
    const existingThreadQuery = await db
      .collection("threads")
      .where("buyer", "==", buyer)
      .where("listing", "==", listingId)
      .limit(1) // Optimize by limiting results to 1
      .get();

    if (!existingThreadQuery.empty) {
      return res.status(200).json({ threadId: existingThreadQuery.docs[0].id });
    }

    // Create a new thread if one doesn't exist
    const threadRef = await db.collection("threads").add({
      buyer,
      listing: listingId,
      seller,
      messages: [],
      createdAt: new Date(), // Add timestamp for sorting and tracking
    });

    return res.status(201).json({ threadId: threadRef.id });
  } catch (error) {
    console.error("===== Error occurred =====", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { threadId, message } = req.body;
    const sender = req.user.uid;

    // Fetch the thread document properly
    const threadRef = db.collection("threads").doc(threadId);
    const threadDoc = await threadRef.get(); // ✅ Await here
    if (!threadDoc.exists) {
      return res.status(400).json({ error: "Thread does not exist" });
    }

    const threadData = threadDoc.data(); // ✅ Now, this works

    const listing_Id = threadData.listing;
    const buyer = threadData.buyer;
    const seller = threadData.seller;

    // Fetch the listing document
    const listingRef = db.collection("listings").doc(listing_Id);
    const listingDoc = await listingRef.get();

    if (!listingDoc.exists) {
      return res.status(400).json({ error: "Listing does not exist" });
    }

    // Determine the receiver
    const receiver = sender === buyer ? seller : buyer;

    // Create message
    const createdMessageId = await createMessage(
      sender,
      receiver,
      message,
      threadId
    );
    if (!createdMessageId) {
      return res
        .status(400)
        .json({ error: "Cannot send the message to the sender" });
    }

    // Add message to thread
    await addMessageToThread(threadId, createdMessageId);

    return res.status(200).json({
      messageInfo: {
        id: createdMessageId,
        threadId: threadId,
        sender: sender,
        receiver: receiver,
        message: message,
      },
    });
  } catch (error) {
    console.error("Error in addMessage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMessageByThread = async (req, res) => {
  try {
    const threadId = req.params.id;
    const messageRef = db.collection("messages");

    // Fetch messages for the given threadId
    const messageDocs = await messageRef.where("threadId", "==", threadId).get();

    // Map and sort messages based on createdAt timestamp
    const messages = messageDocs.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        if (a.createdAt._seconds !== b.createdAt._seconds) {
          return a.createdAt._seconds - b.createdAt._seconds;
        }
        return a.createdAt._nanoseconds - b.createdAt._nanoseconds;
      });

    console.log(messages);

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
