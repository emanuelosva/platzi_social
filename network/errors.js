/**
 * @fileoverview Error handler file
 *
 * @version 1.1
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const response = require('./response');

const errors = (err, req, res, next) => {
  console.error('[error] -> ' + err);

  const message = err.message || 'Internal error';
  const status = err.statusCode || 500;

  response.error(req, res, message, status);
}

module.exports = errors;
