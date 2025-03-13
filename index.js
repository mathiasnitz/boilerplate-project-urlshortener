require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
let urlCounter = 0;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;
  const urlRegex = /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/;

  if(urlRegex.test(url)){
    urlCounter++;
    const short_url = urlCounter;

    res.json({ original_url: url, short_url: urlCounter});
  } else {
    res.json({"error": "invalid url"});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
