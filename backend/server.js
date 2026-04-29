const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Hindustan Radiance API is running...');
});

app.get('/backend', (req, res) => {
  res.send('Hindustan Radiance API (Backend Prefix) is running...');
});

// Import Routes
const newsRoutes = require('./routes/news');
const adminRoutes = require('./routes/admin');
const epaperRoutes = require('./routes/epaper');

// Helper to apply routes to both root and /backend prefix
const applyRoutes = (path, router) => {
  app.use(path, router);
  app.use(`/backend${path}`, router);
};

applyRoutes('/api/news', newsRoutes);
applyRoutes('/api/admin', adminRoutes);
applyRoutes('/api/epaper', epaperRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
