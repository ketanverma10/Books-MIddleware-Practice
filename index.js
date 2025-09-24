const express = require('express'); 
const { loggermiddleware } = require('./middleware/logger');
const app = express();
const port = 3000;

app.use(express.json());
app.use(loggermiddleware);
// books routes
app.use('/books', require('./Routes/books.routes'));
app.use('/authors', require('./Routes/author.routes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
