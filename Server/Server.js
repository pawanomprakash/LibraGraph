require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./Config/connection.js");
const bookRoutes = require('./Routes/routes');
const bodyParser = require("body-parser");
const authRoutes = require('./Routes/auth');
const groqRoute = require('./Routes/groqRoute');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://libragraph-1.onrender.com',
  'https://libragraph.onrender.com', 
  'http://localhost:3000',
  'https://libragraph-backend-7yjq.onrender.com'
  // // Add more origins as needed
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/voicebot', groqRoute);

connectToDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});

module.exports = app;
