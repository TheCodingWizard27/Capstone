// wsHandler.js
const WebSocket = require("ws");

const setupWebSocket = (server) => {
  // Create a WebSocket server using the provided HTTP server
  const wss = new WebSocket.Server({ server });

  // Handle WebSocket connections
  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
      // Echo the received message back to the client
      ws.send(`Server received: ${message}`);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
};

module.exports = setupWebSocket;
