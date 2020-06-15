/**
 * @fileoverview Change db in execution time
*/
const controller = require('./controller');
const config = require('../../../config');

let store;
config.remoteDB
  ? store = require('../../../store/remote_mysql')
  : store = require('../../../store/mysql');

module.exports = controller(store);
