const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Model/User');
const { jwtSecret, jwtExpiry } = require('../Config/auth');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Respond with the list of users
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/saveUser', async (req, res) => {
  try {
    const { email, firstName, lastName, externalId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists in the database" });
    }

    // Create a new user in MongoDB
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      externalId, // Clerk's external ID
    });

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected Route
router.get('/protected', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }

    // Verify the token
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      res.status(200).json({ message: "Protected content", user });
    });
  } catch (error) {
    console.error("Protected route error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
