const account = require('./account');
const approveorder = require('./approveorder');

module.exports = (app) => {
  app.get('/account/:userid', account.get);
  app.put('/account/:userid', account.put);
  app.post('/approveorder', approveorder.post);
};
