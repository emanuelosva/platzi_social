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
module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;

  !store
    ? store = require('../../../store/dummy') : null;

  !cache
    ? cache = require('../../../store/dummy') : null;

  const list = async () => {
    let users = await cache.list(TABLE);

    if (!users) {
      console.log('De DB')
      users = await store.list(TABLE);
      cache.upsert(TABLE, users);
    } else {
      console.log('Viene de cache');
    }
    return users;
  };

  const get = async (id) => {
    let user = await cache.get(TABLE, id);

    if (!user) {
      let _user = await store.get(TABLE, id);
      user = _user[0]
      cache.upsert(TABLE, user);
    }

    return user;
  };

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
        password: body.password,
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
