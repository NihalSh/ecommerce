const account = require('./account');

module.exports = (app) => {
  app.get('/account/:userid', account.get);
  app.put('/account/:userid', account.put);
};
