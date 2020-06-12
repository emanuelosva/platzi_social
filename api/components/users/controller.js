/**
 * @fileoverview Bussines Logic for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const nanoid = require('nanoid').nanoid;

const TABLE = 'user';

// Logic
module.exports = function (injectedStore) {
  let store = injectedStore;
  !store
    ? store = require('../../../store/dummy') : null;

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const upsert = (body) => {
    const user = { name: body.name };

    body.id
      ? user.id = body.id
      : user.id = nanoid();

    return store.upsert(TABLE, user)
  };

  const remove = (id) => store.remove(TABLE, id);

  return {
    list,
    get,
    upsert,
    remove,
  };
};
