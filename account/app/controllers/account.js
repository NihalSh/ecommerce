/* eslint no-underscore-dangle: "off" */
const Account = require('../models/account');

function handleGetRequest(req, res) {
  Account
    .findByUserid(req.params.userid)
    .then((doc) => {
      if (!doc) {
        res.sendStatus(204);
        return;
      }
      const { _id, __v, ...newDoc } = doc;
      res.json(newDoc);
    }).catch(() => {
      res.sendStatus(400);
    });
}

function handlePutRequest(req, res) {
  Account
    .findByUserid(req.params.userid)
    .then((doc) => {
      if (!doc) {
        res.sendStatus(204);
        return;
      }
      Account
        .updateByUserid({
          userid: req.params.userid,
          userName: req.body.userName,
          wallet: req.body.wallet,
          roles: req.body.roles,
        })
        .then((document) => {
          if (!document) {
            res.sendStatus(400);
            return;
          }
          res.sendStatus(202);
        }).catch(() => (
          res.sendStatus(400)
        ));
    }).catch(() => (
      res.sendStatus(400)
    ));
}

module.exports.get = handleGetRequest;
module.exports.put = handlePutRequest;
