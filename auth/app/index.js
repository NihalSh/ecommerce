const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { mongodb: { uri: connectionUri } } = require('../config');

const app = express();

mongoose.connection.on('error', (err) => {
  if (err) {
    process.exit(1);
  }
});

mongoose.connect(connectionUri, { useMongoClient: true }, (err) => {
  if (err) {
    throw err;
    process.exit(1);
  }
  require('./mockCredentials')();
});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./controllers')(app);

module.exports = app;
