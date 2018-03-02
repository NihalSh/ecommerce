const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth', (req, res) => {
  req.pipe(
    request[req.method.toLowerCase()]('http://127.0.0.1:60000/auth')
  ).pipe(res);
});

app.get('/api/products', (req, res) => {
  req.pipe(
    request[req.method.toLowerCase()]('http://127.0.0.1:6767/items')
  ).pipe(res);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
