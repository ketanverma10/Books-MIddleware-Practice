const express = require('express');
const router = express.Router();
const books = require('../data/books.js');

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Get a single book by ID
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// Add a new book
router.post('/', (req, res) => {
    const { book_name, book_author } = req.body;
    if (!book_name || !book_author) {
        return res.status(400).json({ error: "book_name and book_author are required" });
    }
    const newBook = {
        id: books.length + 1,
        book_name,
        book_author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

module.exports = router;
