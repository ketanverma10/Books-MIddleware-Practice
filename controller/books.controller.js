const books = require('../models/books.js').books;

exports.getAllBooks = function(req, res)  {
    res.json(books);
};

exports.getBookById = function(req, res)  {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid book ID" });


    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
}

exports.addBook = function(req, res)  {
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
}

exports.deleteBook = function(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid book ID" });   
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
}