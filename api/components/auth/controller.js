/**
 * @fileoverview Bussines Logic for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const TABLE = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;
  !injectedStore
    ? store = require('../../../store/dummy') : null

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });

    if (data) {
      if (data.password === password) {
        return 'TOKEN'
      } else {
        throw new Error('Invalid data')
      }
    }
  };

  const upsert = (data) => {
    const authData = { id: data.id };

    data.username ? authData.username = data.username : null
    data.password ? authData.password = data.password : null

    return store.upsert(TABLE, authData);
  };

  return {
    upsert,
    login,
  };
};
