/**
 * @fileoverview Middleware for authentication
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const auth = require('../../../auth');

module.exports = checkAuth = (action) => {

  const middleware = (req, res, next) => {
    switch (action) {
      case 'upsert':
        auth.check.logged(req);
        next();
        break;

      default:
        next();
    }
  };

  return middleware;
};
