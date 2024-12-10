require("dotenv").config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "libragraph",
    jwtExpiry: "1d",
  };
