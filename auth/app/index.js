const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { mongodb: { uri: connectionUri } } = require('../config');

const app = express();
mongoose.connect(connectionUri, { useMongoClient: true });
mongoose.Promise = global.Promise;

require('./mockCredentials')();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./controllers')(app);

module.exports = app;
