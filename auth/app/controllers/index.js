const auth = require('./auth');

module.exports = (app) => {
  app.get('/auth', auth.get);
  app.post('/auth', auth.post);
};
