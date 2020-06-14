/**
 * @fileoverview Remote connection constructor
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);
