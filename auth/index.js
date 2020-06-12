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

const sign = (usarData) => {
  return jwt.sign(usarData, config.auth.secret);
};

const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  sign,
  hash,
  compare,
};
