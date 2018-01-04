const mongoose = require('mongoose');

const credentialsSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

class CredentialsClass {
  static findByUserid(userid) {
    return this.findOne({ userid });
  }
}

credentialsSchema.loadClass(CredentialsClass);

const Credentials = mongoose.model('Auth', credentialsSchema);

module.exports = Credentials;
