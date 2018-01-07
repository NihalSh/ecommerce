const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  roles: {
    type: [String],
    default: [],
  },
});

class AccountClass {
  static findByUserid(userid) {
    return this.findOne({ userid }).lean();
  }

  static updateByUserid(account = {}) {
    return this.findOneAndUpdate(
      {
        userid: account.userid,
      },
      {
        $set: {
          userName: account.userName,
          wallet: account.wallet,
          roles: account.roles,
        },
      },
    ).exec();
  }
}

accountSchema.loadClass(AccountClass);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
