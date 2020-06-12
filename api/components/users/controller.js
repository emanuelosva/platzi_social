/**
 * @fileoverview Bussines Logic for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const nanoid = require('nanoid').nanoid;

const auth = require('../auth');

const TABLE = 'user';

// Logic
module.exports = function (injectedStore) {
  let store = injectedStore;
  !store
    ? store = require('../../../store/dummy') : null;

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
    };

    body.id
      ? user.id = body.id
      : user.id = nanoid();

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password || user.password,
      });
    }

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
