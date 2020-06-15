/**
 * @fileoverview Change db in execution time
*/
const controller = require('./controller');
const config = require('../../../config');

let store, cache;
if (config.remoteDB) {
  store = require('../../../store/remote_mysql')
  cache = require('../../../store/remote_redis')
} else {
  store = require('../../../store/mysql');
  cache = require('../../../store/redis');
}

module.exports = controller(store, cache);
