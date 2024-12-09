require("dotenv").config();
const express = require("express");
const connectToDB = require("./Config/connection.js");
const bookRoutes = require('./Routes/routes');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api', bookRoutes);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});

module.exports = app;