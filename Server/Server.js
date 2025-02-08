require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./Config/connection.js");
const bookRoutes = require('./Routes/routes');
const authRoutes = require('./Routes/auth');
const groqRoute = require('./Routes/groqRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
  'https://libragraph-1.onrender.com',
  'https://libragraph.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173', // Ensure Vite’s dev server is included
  'https://libragraph-backend-7yjq.onrender.com',
];

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow requests from allowed origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers allowed in requests
  credentials: true // If using cookies or auth tokens
};

// Apply CORS middleware
app.use(cors(corsOptions));
// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/voicebot', groqRoute);

// Connect to database and start server
connectToDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});

module.exports = app;
