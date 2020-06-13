/**
 * @fileoverview Tunning errors
 *
 * @version 1.1
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const error = (message, statusCode) => {
  let e = new Error(message);

  statusCode ? e.statusCode = statusCode : null;
  return e
};

module.exports = error;
