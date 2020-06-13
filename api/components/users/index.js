/**
 * @fileoverview Change db in execution time
*/
const controller = require('./controller');
const store = require('../../../store/mysql');
// const store = require('../../../store/dummy');

module.exports = controller(store);
