require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./Config/connection.js");
const bookRoutes = require('./Routes/routes');
const bodyParser = require("body-parser");
const authRoutes = require('./Routes/auth');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api/auth', authRoutes);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});

module.exports = app;