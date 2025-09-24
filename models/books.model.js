const {pgTable,uuid,varchar,text} = require('drizzle-orm/pg-core');
const authorTable = require('./author.model');

const bookTable= pgTable('books',{
    id:uuid().primaryKey().defaultRandom(),
    title:varchar({length:200}).notNull(),
    description:text(),
    authorId:uuid().references(()=>authorTable.id).notNull()
})


module.exports=bookTable;


