const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth', (req, res) => {
  const method = req.method.toLowerCase();
  const stream = request[method]('http://127.0.0.1:60000/auth');
  stream.on('error', function (err) {
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.get('/api/products/:id', (req, res) => {
  const method = req.method.toLowerCase();
  const url = `http://127.0.0.1:6767/items/${req.params.id}`;
  const stream = request[method](url);
  stream.on('error', function (err) {
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.get('/api/products', (req, res) => {
  const method = req.method.toLowerCase();
  const stream = request[method]('http://127.0.0.1:6767/items');
  stream.on('error', function (err) {
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
