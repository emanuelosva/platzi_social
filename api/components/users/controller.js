/**
 * @fileoverview Bussines Logic for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const TABLE = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore;
  !store
    ? store = require('../../../store/dummy') : null;

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const upsert = (data) => store.upsert(TABLE, data);

  const remove = (id) => store.remove(TABLE, id);

  return {
    list,
    get,
    upsert,
    remove,
  };
};
