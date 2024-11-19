const ws = new WebSocket('ws://localhost:8000');

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
  ws.send('Hello from the client!');
};

ws.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

ws.onclose = () => {
  console.log('Disconnected from the server');
};
