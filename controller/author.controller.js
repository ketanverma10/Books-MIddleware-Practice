const author = require("../models/author.model.js");
const db = require("../db/index.js");
const { eq } = require("drizzle-orm");
const bookTable = require("../models/books.model.js");
const { validate: isUuid } = require("uuid");


exports.getAllAuthors = async function (req, res) {
  try {
    const allAuthors = await db.select().from(author);
    res.json(allAuthors);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAuthorById = async function (req, res) {
  try {
    const id = req.params.id;
    // check if valid UUID
    if (!isUuid(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }
    const authorData = await db
      .select()
      .from(author)
      .where(eq(author.id, id))
      .limit(1);
    if (authorData.length === 0)
      return res.status(404).json({ error: "Author not found" });
    res.json(authorData);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err: err });
  }
};

exports.addAuthor = async function (req, res) {
  try {
    const { firstname, lastname, email } = req.body;
    if (!firstname || firstname === "" || email === "" || !email) {
      return res.status(400).json({ error: "Name or email is required" });
    }
    const [result] = await db
      .insert(author)
      .values({
        firstName: firstname,
        lastName: lastname,
        email: email,
      })
      .returning({ id: author.id });
    res
      .status(201)
      .json({ message: "Author added successfully", author: result.id });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAuthor = async function (req, res) {
  try {
    const id = req.params.id;

    if (!isUuid(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    // Check if author has any books
    const booksByAuthor = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.authorId, id));

    if (booksByAuthor.length > 0) {
      return res
        .status(400)
        .json({ error: "Cannot delete author with associated books" });
    }

    // Delete the author
    const [result] = await db
      .delete(author)
      .where(eq(author.id, id))
      .returning({ id: author.id });

    if (!result) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json({
      message: "Author deleted successfully",
      author_id: result.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
};
