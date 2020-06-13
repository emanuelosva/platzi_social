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

  const remove = async (id) => {
    await auth.remove(id)
    return store.remove(TABLE, id)
  };

  const follow = (userFrom, userTo) => {
    return store.upsert(TABLE + '_follow', {
      user_from: userFrom,
      user_to: userTo,
    });
  };

  const getFollows = (userId) => {
    const join = {};
    join[TABLE] = 'user_to';
    const query = { user_from: userId };
    return store.query(TABLE + '_follow', query, join);
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    getFollows,
  };
};
