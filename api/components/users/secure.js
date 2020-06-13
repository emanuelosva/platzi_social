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
      case 'update':
        const owner = req.body.id;
        auth.check.own(req, owner);
        next();
        break;

      case 'follow':
        auth.check.logged(req);
        next();
        break;

      default:
        next();
    }
  };

  return middleware;
};