const express = require('express');
const router = express.Router();
const controller = require('../controller/author.controller');

// Get all books
router.get('/', controller.getAllAuthors);

// Get a single book by ID
router.get('/:id', controller.getAuthorById);

// Add a new book
router.post('/', controller.addAuthor);

router.delete('/:id', controller.deleteAuthor);


module.exports = router;
