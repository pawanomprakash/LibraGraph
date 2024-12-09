const express = require('express');
const Book = require('../Model/BookSchema');

const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

module.exports = router;
