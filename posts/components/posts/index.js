/**
 * @fileoverview Change db in execution time
*/

const controller = require('./controller');
const store = require('../../../store/mysql');

module.exports = controller(store);
