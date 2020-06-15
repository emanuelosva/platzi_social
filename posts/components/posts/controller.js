/**
 * @fileoverview Bussines Logic for posts
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/
const nanoid = require('nanoid').nanoid;

const auth = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'post';

module.exports = function name(injectedStore, injectedCache) {

  // DB manage
  let store = injectedStore;
  let cache = injectedCache;
  !injectedStore
    ? store = require('../../../store/dummy') : null
  !injectedStore
    ? store = require('../../../store/dummy') : null

  // Controller logic
  const list = async () => {
    let posts = await cache.list(TABLE);

    if (!posts) {
      posts = await store.list(TABLE);
      cache.upsert(TABLE, posts);
    }

    return posts;
  };

  const get = async (id) => {
    let post = await cache.get(TABLE, id);

    if (!post) {
      let _post = await store.get(TABLE, id);
      post = _post[0];
      cache.upsert(TABLE, post)
    }
    return post
  };

  const upsert = async (body) => {
    _post = {
      user: body.user,
      text: body.text,
    }

    body.id
      ? _post.id = body.id
      : _post.id = nanoid();

    return store.upsert(TABLE, _post);
  };

  const remove = async (id) => {
    return store.remove(TABLE, id);
  };

  return {
    list,
    get,
    upsert,
    remove,
  };
};
