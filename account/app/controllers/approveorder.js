const Account = require('../models/account');
const Order = require('../models/order');

function handlePostRequest(req, res) {
  if (!req.body.userid || !req.body.order_id || !req.body.amount) {
    res.sendStatus(400);
    return;
  }
  Account
    .findByUserid(req.body.userid)
    .then((doc) => {
      if (!doc) {
        res.sendStatus(400);
        return;
      }
      Order
        .findByOrderId(req.body.order_id)
        .then((order) => {
          if (order) {
            res.sendStatus(200);
            return;
          }
          if (doc.wallet >= req.body.amount) {
            Account
              .updateByUserid({ ...doc, wallet: doc.wallet - req.body.amount })
              .then((newAccount) => {
                if (!newAccount) {
                  res.sendStatus(500);
                  return;
                }
                Order.create({
                  userid: req.body.userid,
                  orderId: req.body.order_id,
                  amount: req.body.amount,
                }).then((newOrder) => {
                  if (newOrder) {
                    res.sendStatus(201);
                    return;
                  }
                  res.sendStatus(500);
                }).catch(() => {
                  res.sendStatus(500);
                });
              }).catch(() => (
                res.sendStatus(500)
              ));
          } else {
            res.sendStatus(400);
          }
        }).catch(() => (
          res.send(500)
        ));
    });
}

module.exports.post = handlePostRequest;
