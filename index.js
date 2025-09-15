const express = require('express'); 
const app = express();
const port = 3000;

app.use(express.json());

// books routes
app.use('/books', require('./Routes/books.routes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
