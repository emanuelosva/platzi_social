/**
 * @fileoverview Bussines Logic for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const store = require('../../../store/dummy');
const TABLE = 'user';

const list = () => store.list(TABLE);

module.exports = {
  list,
};
