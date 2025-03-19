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
    const productName = listingData.title || "Unknown Product"; // Get title from listing data

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
      .limit(1)
      .get();

    if (!existingThreadQuery.empty) {
      return res.status(200).json({ threadId: existingThreadQuery.docs[0].id });
    }

    // Create a new thread if one doesn't exist
    const threadRef = await db.collection("threads").add({
      buyer,
      listing: listingId,
      seller,
      productName, // Add productName to thread
      messages: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
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

    const threadRef = db.collection("threads").doc(threadId);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      return res.status(400).json({ error: "Thread does not exist" });
    }

    const threadData = threadDoc.data();
    const listingId = threadData.listing;
    const buyer = threadData.buyer;
    const seller = threadData.seller;
    const productName = threadData.productName; // Get productName from thread
    const modifiedAt = threadData.modifiedAt;

    const receiver = sender === buyer ? seller : buyer;

    const createdMessageId = await createMessage(
      sender,
      receiver,
      message,
      threadId,
      productName
    );

    if (!createdMessageId) {
      return res
        .status(400)
        .json({ error: "Cannot send the message to the sender" });
    }

    await addMessageToThread(threadId, createdMessageId);

    return res.status(200).json({
      messageInfo: {
        id: createdMessageId,
        threadId,
        sender,
        receiver,
        message,
        productName,
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
    const threadRef = db.collection("threads").doc(threadId);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      return res.status(404).json({ error: "Thread not found" });
    }

    const threadData = threadDoc.data();
    const productName = threadData.productName; // Get productName from thread

    const messageDocs = await messageRef
      .where("threadId", "==", threadId)
      .get();

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

    const messagesWithProductName = messages.map((message) => ({
      ...message,
      productName, // Include productName in the response
    }));

    res.status(200).json({ messages: messagesWithProductName });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ error: "Error fetching messages", details: error.message });
  }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const userId = req.user.uid;
    const threadRef = db.collection("threads");
    const userRef = db.collection("users");

    const buyerThreads = await threadRef.where("buyer", "==", userId).get();
    const sellerThreads = await threadRef.where("seller", "==", userId).get();

    const threadDocs = [];

    buyerThreads.forEach((doc) => {
      threadDocs.push({
        threadId: doc.id,
        seller: doc.data().seller,
        productName: doc.data().productName,
        myRole: "buyer",
        modifiedAt: doc.data().modifiedAt,
      });
    });

    sellerThreads.forEach((doc) => {
      threadDocs.push({
        threadId: doc.id,
        buyer: doc.data().buyer,
        productName: doc.data().productName,
        myRole: "seller",
        modifiedAt: doc.data().modifiedAt,
      });
    });

    const userPromises = threadDocs.map(async (thread) => {
      const userIdToFetch =
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

    const resolvedThreads = await Promise.all(userPromises);

    resolvedThreads.sort((a, b) => {
      if (b.modifiedAt._seconds === a.modifiedAt._seconds) {
        return b.modifiedAt._nanoseconds - a.modifiedAt._nanoseconds; // Sort by nanoseconds if seconds are equal
      }
      return b.modifiedAt._seconds - a.modifiedAt._seconds; // Sort by seconds first
    });

    res.status(200).json({ threads: resolvedThreads });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching threads", details: error.message });
  }
};

const createMessage = async (
  sender,
  receiver,
  message,
  threadId,
  productName
) => {
  try {
    // Ensure productName is defined before passing it to Firestore
    const validProductName = productName || "Unknown Product";

    const createdMessage = await db.collection("messages").add({
      threadId,
      sender,
      receiver,
      message,
      productName: validProductName, // Use valid productName
      delivered: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return createdMessage.id;
  } catch (error) {
    console.log(`=====Error occurred===== ${error}`);
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

  const threadData = threadDoc.data();
  const messages = threadData.messages || [];

  await threadRef.update({
    messages: [...messages, messageId],
    modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("Message added successfully to thread:", threadId);
};
