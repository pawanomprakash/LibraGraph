const express = require('express');
const Book = require('../Model/BookSchema');
const FictionBook = require('../Model/FictionBookSchema');
const ScienceBook = require('../Model/ScienceBookSchema');
const BiographyBook = require('../Model/BiographyBookSchema');
const FantasyBook = require('../Model/FantasyBookSchema');
const HistoryBook = require('../Model/HistoryBookSchema');
const TechnologyBook = require('../Model/TechnologyBookSchema');
const RomanceBook = require('../Model/RomanceBookSchema');

const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

// Fetch all fiction books
router.get('/fiction', async (req, res) => {
    try {
      const fictionBooks = await FictionBook.find();
      res.status(200).json(fictionBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fiction books', error });
    }
  });
  
  // Fetch all science books
  router.get('/science', async (req, res) => {
    try {
      const scienceBooks = await ScienceBook.find();
      res.status(200).json(scienceBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching science books', error });
    }
  });

  router.get('/biography', async (req, res) => {
    try {
      const biographyBooks = await BiographyBook.find();
      res.status(200).json(biographyBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching biography books', error });
    }
  });

  router.get('/fantasy', async (req, res) => {
    try {
      const fantasyBooks = await FantasyBook.find();
      res.status(200).json(fantasyBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fantasy books', error });
    }
  });

  router.get('/history', async (req, res) => {
    try {
      const historyBooks = await HistoryBook.find();
      res.status(200).json(historyBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching history books', error });
    }
  });


  router.get('/technology', async (req, res) => {
    try {
      const technologyBooks = await TechnologyBook.find();
      res.status(200).json(technologyBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching technology books', error });
    }
  });


  router.get('/romance', async (req, res) => {
    try {
      const romanceBooks = await RomanceBook.find();
      res.status(200).json(romanceBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching romance books', error });
    }
  });

module.exports = router;
