/**
 * @fileoverview Bussines Logic for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const auth = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  // Set the correct db manage
  let store = injectedStore;
  !injectedStore
    ? store = require('../../../store/dummy') : null

  // Controller logic
  const login = async (username, password) => {

    const dataQuery = await store.query(TABLE, { username: username });
    const data = { ...dataQuery[0] }
    if (data) {
      return auth.compare(password, data.password)
        .then(correctPassword => {
          if (correctPassword) {
            return auth.sign(data);
          } else {
            throw error('Invalid data', 401);
          }
        });
    }
  };

  const upsert = async (data) => {
    const authData = { id: data.id };

    data.username
      ? authData.username = data.username
      : null
    data.password
      ? authData.password = await auth.hash(data.password)
      : null

    return store.upsert(TABLE, authData);
  };

  const remove = async (id) => {
    await store.remove(TABLE, id);
  }

  return {
    upsert,
    login,
    remove,
  };
};
