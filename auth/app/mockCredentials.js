const crypto = require('crypto');

const Credentials = require('./models/credentials');

module.exports = () => {
  Credentials.findByUserid('user1')
    .then((doc) => {
      if (!doc) {
        Credentials.create({
          userid: 'user1',
          password: crypto
            .createHmac('sha256', '8ae02905-8d41-47ea-a3a5-2159fec8272f')
            .update('1234567')
            .digest('hex'),
          salt: '8ae02905-8d41-47ea-a3a5-2159fec8272f',
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
