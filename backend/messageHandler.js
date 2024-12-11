const WebSocket = require("ws");
const url = require("url");
const { auth,db } = require("./firebase/firebase");
const admin = require("firebase-admin");

class ClientHandler {
  constructor() {
    if (!ClientHandler.instance) {
      this.activeClients = new Map(); // Use Map for better client tracking: { userId: WebSocket }
      ClientHandler.instance = this;
    }
    return ClientHandler.instance;
  }

  async validateToken(token) {
    try {
      // Verify the ID token
      const decodedToken = await auth.verifyIdToken(token);
      return { verified: true, userId: decodedToken.uid, error: null };
    } catch (error) {
      return { verified: false, error };
    }
  }

  async addClient(ws, token) {
    const tokenResponse = await this.validateToken(token);

    if (tokenResponse.verified) {
      const userId = tokenResponse.userId;
      this.activeClients.set(userId, ws); // Track client by userId
      console.log(`Client connected: ${userId}`);
    } else {
      const errorMessage =
        tokenResponse.error.code === "auth/argument-error" ||
        tokenResponse.error.message.includes(
          "Decoding Firebase ID token failed"
        )
          ? "Unauthorized: Invalid or expired token"
          : tokenResponse.error.message;

      ws.send(
        JSON.stringify({
          type: "error",
          message: errorMessage,
        })
      );
      ws.close();
    }
  }

  removeClient(ws) {
    for (const [userId, clientWs] of this.activeClients.entries()) {
      if (clientWs === ws) {
        this.activeClients.delete(userId);
        console.log(`Client disconnected: ${userId}`);
        break;
      }
    }
  }

  handleMessage(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      console.log(`Handling message: ${message}`);
      ws.send(`Processed message: ${message}`);
    }
  }

  sendMessageToUser(userId, data) {
    const ws = this.activeClients.get(userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
      console.log(`Sent message to user: ${userId}`);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  }

  getActiveClients() {
    return Array.from(this.activeClients.keys());
  }
}

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  const clientHandler = new ClientHandler();

  // Handle WebSocket connections
  wss.on("connection", (ws, req) => {
    const parameters = url.parse(req.url, true).query;
    const token = parameters.token;

    if (!token) {
      ws.send(JSON.stringify({ type: "error", message: "No token provided" }));
      ws.close();
      return;
    }

    clientHandler.addClient(ws, token);

    ws.on("message", (message) => {
      clientHandler.handleMessage(ws, message);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
      clientHandler.removeClient(ws);
    });
  });

  // Set up Firestore listener
  setupFirestoreListener(clientHandler);
};

//Listen for firestore changes
const setupFirestoreListener = (clientHandler) => {
  const threadsCollection = db.collection("threads");

  threadsCollection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "modified" || change.type === "added") {
        const threadId = change.doc.id;
        const threadData = change.doc.data();
        const { messages } = threadData;

        if (messages && messages.length > 0) {
          const latestMessage = messages[messages.length - 1];
          const { receiver } = latestMessage;

          // Notify the recipient of the new message
          clientHandler.sendMessageToUser(receiver, {
            type: "message",
            threadId,
            data: latestMessage,
          });
        }
      }
    });
  });

  console.log("Firestore listener for threads collection initialized");
};

module.exports = setupWebSocket;
