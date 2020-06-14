/**
 * @fileoverview DB connect and manage for MySQL
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

const mysql = require('mysql');
const config = require('../config');

// MySQL conf
const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Connection
let connection;

const handleConnection = () => {
  connection = mysql.createConnection(dbconfig);

  connection.connect(err => {
    if (err) {
      console.error('[db] -> Error', err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log('[db] MySQL connected');
    }
  });

  connection.on('error', err => {
    console.error('[db] -> Error', err);
    if (err.code === 'PROTOCOL_CONECTION_LOST') {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

// Manage DB
const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) { return reject(err); }
      resolve(data);
    });
  });
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) { return reject(err); }
      resolve(data);
    });
  });
}

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) { return reject(err) }
      resolve(result);
    });
  });
}

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) { return reject(err) }
      resolve(result);
    });
  });
}

const query = (table, query, join) => {
  let joinedQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinedQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinedQuery} WHERE ${table}.?`,
      query, (err, data) => {
        if (err) { return reject(err) }
        resolve(data || null);
      });
  });
}

const upsert = async (table, data) => {
  if (data.id) {
    let queryData = await query(table, { id: data.id })
    if (queryData[0]) {
      return update(table, data);
    } else {
      return insert(table, data);
    }
  } else {
    return insert(table, data);
  }
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id=?`, id, (err, data) => {
      if (err) { return reject(err) }
      resolve(data);
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
  insert,
  update,
};
