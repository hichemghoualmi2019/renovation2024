/* import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

const urlMap = new Map();
// Generate a random alphanumeric key
function generateKey(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }
  return key;
}
// Handle POST requests to shorten URLs
app.get('/shorten', (req, res) => {
    const url = req.query.url;

    console.log(url);
  
    //const url = 'test123.com';

    if (url) {
        // Generate a unique key
        let key;
        do {
          key = generateKey(6);
        } while (urlMap.has(key));
    
        urlMap.set(key, url);
    
        res.json({ shortUrl: `http://localhost:3000/${key}` });
      } else {
        res.status(400).send('URL is required');
    }
  });

// Handle GET requests to redirect to the original URL
app.get('/:key', (req, res) => {
  const key = req.params.key;

  if (urlMap.has(key)) {
    //res.status(404).send('YES the URL is found');
    const url = urlMap.get(key);
    res.status(404).send(url);
    //res.redirect(url);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
*/


import express from 'express';
import shortenRouter from './routes/shorten';
const cors = require('cors');


const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/shorten', shortenRouter);

app.listen(3000, () => console.log('Server running on port 3000'));