const {pgTable,uuid,varchar} =require('drizzle-orm/pg-core')

const authorTable = pgTable('authors',{
    id:uuid().primaryKey().defaultRandom(),
    firstName:varchar({length:100}).notNull(),
    lastName:varchar({length:100}),
    email:varchar({length:100}).notNull().unique()
})

module.exports=authorTable;
