const books = require('../models/books.model.js');
const db = require('../db/index.js');
const { eq } = require('drizzle-orm');  
const { validate: isUuid } = require("uuid");


exports.getAllBooks =  async function(req, res)  {
   try{
    const allBooks = await db.select().from(books);
    res.json(allBooks);
   }
   catch(err){
    res.status(500).json({ error: "Internal Server Error" });
   }
    
};

exports.getBookById = async function(req, res)  {
    try{
    const id = req.params.id;

    if (!isUuid(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const book = await db.select().from(books).where((books.id,id)).limit(1);
    if (book.length===0) return res.status(404).json({ error: "Book not found" });
    res.json(book);
    }
    catch(err){
        res.status(500).json({ error: "Internal Server Error",err:err  });
    }
}

exports.addBook = async function(req, res)  {
    try{

        const { title, description ,authorId } = req.body;
        if (!title || title===""||!authorId || authorId==="") {
            return res.status(400).json({ error: "title and author are required" });
        }
        const [result] = await db.insert(books).values({
            title,
            description,    
            authorId
        }).returning({id:books.id});
        
    
        res.status(201).json({message:"Book added successfully", book: result.id});
    }
    catch(err){
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.deleteBook = async function(req, res) {
    try{
    const id = req.params.id;

    if (!isUuid(id)) {  
        return res.status(400).json({ error: "Invalid UUID" });
    }
    
    const [result] = await db.delete(books).where(eq(books.id,id)).returning({id:books.id});
    if (!result) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", book_id: result.id });
    }
    catch(err){
        res.status(500).json({ error: "Internal Server Error" });
    }
}