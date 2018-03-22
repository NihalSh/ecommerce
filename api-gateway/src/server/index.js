const express = require('express');
const multer = require('multer');
const path = require('path');
const request = require('request');

const publicPath = path.join(__dirname, 'public');
const staticPath = '/static';
const upload = multer({ dest: path.join(publicPath, staticPath) });
const app = express();

app.use(express.static(publicPath));

app.post('/api/auth', (req, res) => {
  const method = req.method.toLowerCase();
  const stream = request[method]('http://127.0.0.1:60000/auth');
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.get('/api/products/:id', (req, res) => {
  const method = req.method.toLowerCase();
  const url = `http://127.0.0.1:6767/items/${req.params.id}`;
  const stream = request[method](url);
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.get('/api/products', (req, res) => {
  const method = req.method.toLowerCase();
  const stream = request[method]('http://127.0.0.1:6767/items');
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.post('/api/products', upload.single('image'), (req, res) => {
  const method = req.method.toLowerCase();
  let url = '';
  if (req.file) {
    url = path.join(staticPath, req.file.filename);
  }
  const requestBody = Object.assign({}, req.body, { image: url });
  const options = {
    method,
    url: 'http://127.0.0.1:6767/items',
    json: requestBody,
  };
  const stream = request(options);
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  stream.pipe(res);
});

app.get('/api/buyingoptions', (req, res) => {
  const method = req.method.toLowerCase();
  const stream = request[method]('http://127.0.0.1:4242/buyingoptions');
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.post('/api/buyingoptions', (req, res) => {
  const method = req.method.toLowerCase();
  const stream = request[method]('http://127.0.0.1:4242/buyingoptions');
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.get('/api/account/:id', (req, res) => {
  const method = req.method.toLowerCase();
  const url = `http://127.0.0.1:60001/account/${req.params.id}`;
  const stream = request[method](url);
  stream.on('error', function handleError(err) {
    console.log(err);
    this.emit('end');
  });
  req.pipe(stream).pipe(res);
});

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
