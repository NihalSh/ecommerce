const Account = require('./models/account');

module.exports = () => {
  Account.findByUserid('user1')
    .then((doc) => {
      if (!doc) {
        Account.create({
          userid: 'user1',
          userName: 'John Doe',
          wallet: 100,
          roles: ['seller'],
        }).then(insetedDoc => (
          console.log(`Document added:\n${insetedDoc}`)
        )).catch(err => (
          console.error(err)
        ));
        return;
      }
      console.log(`Document added:\n${doc}`);
    }).catch((err) => {
      console.log(`Error: \n${err}`);
    });
};
