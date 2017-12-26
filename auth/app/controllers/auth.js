const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Credentials = require('../models/credentials');

const { jwt: { secret } } = require('../../config');

function createToken(payload = {}) {
  const token = jwt.sign(payload, secret);
  return token;
}
/**
 * @typedef {Object} TokenVerification
 * @property {}
 */
/**
 *
 * @param {String} token JWT token
 * @returns {{authenticated: Boolean, payload: Object}} Information about the verfication
 */
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, secret);
    return {
      authenticated: true,
      payload,
    };
  } catch (e) {
    return {
      authenticated: false,
      payload: {},
    };
  }
}

function handleGetRequest(req, res) {
  const authStr = req.get('Authorization');
  const authStrRegex = /^Bearer ([\w\-~]+\.[\w\-~]+\.[\w\-~]+)$/;
  let verificationInfo = null;
  if (authStr && authStrRegex.test(authStr)) {
    verificationInfo = verifyToken(authStr.match(authStrRegex)[1]);
  }
  if (verificationInfo && verificationInfo.authenticated) {
    res.json(verificationInfo.payload);
  } else {
    res.set('WWW-Authenticate', 'Bearer');
    res.sendStatus(401);
  }
}

function handlePostRequest(req, res) {
  if (!req.body || !req.body.userid || !req.body.password) {
    res.sendStatus(400);
  }
  Credentials
    .findByUserid(req.body.userid)
    .then((doc) => {
      if (!doc) {
        res.sendStatus(401);
        return;
      }
      if (crypto.createHmac('sha256', doc.salt).update(req.body.password).digest('hex') === doc.password) {
        const token = createToken({
          userid: doc.userid,
        });
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    }).catch(() => (
      res.sendStatus(400)
    ));
}

module.exports.get = handleGetRequest;
module.exports.post = handlePostRequest;
