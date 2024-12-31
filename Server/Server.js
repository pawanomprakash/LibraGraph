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

const corsOptions = {
  origin: 'https://libragraph.onrender.com',  // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: Add allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Optional: Add headers if necessary
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