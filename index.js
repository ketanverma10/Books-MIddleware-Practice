const express = require('express'); 

const app = express();
port=3000;

app.use(express.json());
app.use('/books', require('./routes/books'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
