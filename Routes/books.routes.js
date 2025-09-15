const express = require('express');
const router = express.Router();
const controller = require('../controller/books.controller');

// Get all books
router.get('/', controller.getAllBooks);

// Get a single book by ID
router.get('/:id', controller.getBookById);

// Add a new book
router.post('/', controller.addBook);

router.delete('/:id', controller.deleteBook);


module.exports = router;
