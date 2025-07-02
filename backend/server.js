const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); // parse JSON bodies

// Static folder for uploads (PDFs, images)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/circulars', require('./routes/circular.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/files', require('./routes/file.routes'));
app.use('/api/admin', require('./routes/adminCounts'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Circular Management System API');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀Server running on port ${PORT}`);
});
