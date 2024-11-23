const { Book } = require("../models/books.js");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Get all books 
router.get(`/`, async (req, res) => {
    try {
      const booksPerPage = req.query.booksPerPage
        ? parseInt(req.query.booksPerPage)
        : 20;
      const page = req.query.page ? parseInt(req.query.page) : 0;
  
      const filters = {};
      if (req.query.title) {
        filters.title = req.query.title;
      }
      if (req.query.author) {
        const author = req.query.author;
      }
      if (req.query.language) {
        filters.language = req.query.language;
      }
      if (req.query.genres) {
        // Handle multiple genres, split by comma and trim spaces
        const genresArray = req.query.genres
          .split(",")
          .map((genre) => genre.trim());
        // Use $in operator to find books with any of the specified genres
        filters.genres = { $in: genresArray };
      }
  
      const totalBooks = await Book.countDocuments(filters);
      const bookList = await Book.find(filters)
        .limit(booksPerPage)
        .skip(booksPerPage * page);
  
      if (!bookList) {
        return res.status(500).json({ success: false });
      }
  
      return res.status(200).json({
        books: bookList,
        totalBooks: totalBooks,
        page: page,
        booksPerPage: booksPerPage,
      });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  });

//
router.get(`/all`, async (req, res) => {
    try {
      const bookList = await Book.find(req.query);
  
      if (!bookList) {
        res.status(500).json({ success: false });
      }
  
      return res.status(200).json(bookList);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });
  
  
//Get a book by id
router.get("/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Validate if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }
  
      // Find the book by ID in the database
      const book = await Book.findById(bookId);
  
      // If book is not found, return a 404 error
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // If book is found, return it as JSON
      res.status(200).json(book);
    } catch (e) {
      console.error(`Error fetching book: ${e}`);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;
