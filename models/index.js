const bookTable = require('./books.model');
const authorTable = require('./author.model');

console.log(bookTable,authorTable);

module.exports = {
    bookTable,
    authorTable,
}

