/**
 * @fileoverview Remote connection to MySQL server
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return Req('GET', table)
  };

  const get = (table, id) => {
    return Req('GET', table, id);
  };

  const insert = (table, data) => {
    return Req('POST', table, data);
  };

  const update = (table, data) => {
    return Req('PUT', table, data);
  };

  const upsert = (table, data) => {
    if (data.id) {
      return update(table, data);
    }
    return insert(table, data);
  }

  const remove = (table, data) => {
    return Req('DELETE', table, data)
  };

  const query = (table, query, join) => {
    return req('POST', table + '/query', { query, join });
  }

  function Req(method, table, data) {
    let url = `${URL}/${table}`;
    body = '';

    if (method === 'GET' && data) {
      url = `${URL}/${table}/${data}`;
    } else {
      body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: { 'content-type': 'application/json' },
        url,
        body,
      }, (err, req, _body) => {
        if (err) {
          console.error('[db remote] Error -> ', err)
          return reject(err.message);
        }

        const respond = JSON.parse(_body);
        return resolve(respond.body);
      });
    });
  };

  return {
    list,
    get,
    insert,
    update,
    remove,
    upsert,
  }

};

module.exports = createRemoteDB;
