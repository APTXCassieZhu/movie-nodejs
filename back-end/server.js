const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
// routes
var search = require('./routes/search.js');
var slide = require('./routes/slide.js');

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// add api
app.use('/search', search);
app.use('/slide', slide);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});