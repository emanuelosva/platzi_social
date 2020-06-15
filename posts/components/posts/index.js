/**
 * @fileoverview Change db in execution time
*/

const controller = require('./controller');
const store = require('../../../store/mysql');
const cache = require('../../../store/redis');

module.exports = controller(store, cache);
