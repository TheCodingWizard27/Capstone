// wsHandler.js
const WebSocket = require("ws");
const url = require("url");
const { auth } = require("./firebase/firebase");

class ClientHandler {
  constructor() {
    if (!ClientHandler.instance) {
      this.activeClients = [];
      ClientHandler.instance = this;
    }
    return ClientHandler.instance;
  }

  async validateToken(token) {
    try {
      // Verify the ID token
      await auth.verifyIdToken(token);
      return { verified: true, error: null };
    } catch (error) {
      return { verified: false, error };
    }
  }

  async addClient(ws, token) {
    const tokenResponse = await this.validateToken(token);

    if (tokenResponse.verified) {
      ws.activeClients = ws.activeClients || [];
      ws.activeClients.push(ws);
      console.log("Client connected successfully.");
    } else {
      if (
        tokenResponse.error.code === "auth/argument-error" ||
        tokenResponse.error.message.includes(
          "Decoding Firebase ID token failed"
        )
      ) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Unauthorized: Invalid or expired token",
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            type: "error",
            message: tokenResponse.error.message,
          })
        );
      }
      ws.close();
    }
  }

  removeClient(ws) {
    const index = this.activeClients.indexOf(ws);
    if (index !== -1) {
      this.activeClients.splice(index, 1);
    }
  }

  handleMessage(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      console.log(`Handling message: ${message}`);
      ws.send(`Processed message: ${message}`);
    }
  }

  getActiveClients() {
    return this.activeClients;
  }
}

const setupWebSocket = (server) => {
  // Create a WebSocket server using the provided HTTP server
  const wss = new WebSocket.Server({ server });

  // Create a single instance of ClientHandler
  const clientHandler = new ClientHandler();

  // Handle WebSocket connections
  wss.on("connection", (ws, req) => {
    const parameters = url.parse(req.url, true).query;
    const token = parameters.token;

    if (!token) {
      ws.send("No token"); // Send a message to the client
      ws.close(); // Close the WebSocket connection
      return; // Stop further processing
    }

    console.log(`New WebSocket connection with token: ${token}`);

    // Add the WebSocket client to the handler
    clientHandler.addClient(ws, token);

    ws.on("message", (message) => {
      // Delegate message handling to the clientHandler
      clientHandler.handleMessage(ws, message);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
      // Remove client from active connections
      clientHandler.removeClient(ws);
    });
  });
};

module.exports = setupWebSocket;
