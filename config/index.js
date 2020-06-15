/**
 * @fileoverview Configuration
 *
 * @version 1.1
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

require('dotenv').config();

module.exports = {
  // API CONFGI
  api: {
    port: process.env.API_PORT || 3000,
  },

  // POST MicroService CONFIG
  post: {
    port: process.env.POST_PORT || 3002,
  },

  // AUTHENTICATION CONFGIG
  auth: {
    secret: process.env.SECRET || 'secret',
  },

  // MySQL CONFGIG (Local)
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'bXT7aZzFdg',
    port: process.env.MYSQL_PORT || '3306',
    password: process.env.MYSQL_PASSWORD || 'Ha5lksthXG',
    database: process.env.MYSQL_DATABASE || 'bXT7aZzFdg',
  },

  // MySQL MicroServcie CONFGIG
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || 'localhost',
  },

  // Remote DB for Deploy
  remoteDB: process.env.REMOTE_DB || false,
};
