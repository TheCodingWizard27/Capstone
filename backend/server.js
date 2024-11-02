const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
