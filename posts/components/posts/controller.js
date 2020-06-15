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

module.exports = function name(injectedStore) {

  // DB manage
  let store = injectedStore;
  !injectedStore
    ? store = require('../../../store/dummy') : null

  // Controller logic
  const list = async () => {
    return store.list(TABLE);
  };

  const get = async (id) => {
    return store.get(TABLE, id)
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
