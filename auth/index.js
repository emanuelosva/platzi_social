/**
 * @fileoverview Authentication
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

const jwt = require('jsonwebtoken');
const config = require('../config');

const sing = (usarData) => {
  return jwt.sign(usarData, config.auth.secret);
};

module.exports = {
  sing,
};
