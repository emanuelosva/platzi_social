/**
 * @fileoverview Authentication
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const error = require('../utils/error');

const secret = config.auth.secret;

const sign = (usarData) => {
  return jwt.sign(usarData, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
}

const getToken = (authorization) => {
  if (!authorization) {
    throw error('No token', 404);
  }

  if (authorization.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 400);
  }

  let token = authorization.replace('Bearer ', '');
  return token;

}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoder = verifyToken(token)

  req.user = decoder;
  return decoder;
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {

      throw error('You do not have authorization', 401);
    }
  },
}

const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  sign,
  check,
  hash,
  compare,
};
