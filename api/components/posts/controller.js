/**
 * @fileoverview Bussines Logic for posts
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const auth = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'post';

module.exports = function name(injectedStore) {

  // DB manage
  let store = injectedStore;
  !injectedStore
    ? store = require('../../../store/dummy') : null

  // Controller logic
  const list = async () => {
    return store.list(TABLE);
  };

  return {
    list,
  };
};
