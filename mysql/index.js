/**
 * @fileoverview Mircroserver for DB
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

// API DB
const express = require('express');
const bodyParser = require('body-parser')
const config = require('../config');
const microMySQL = require('./network');

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/', microMySQL);

app.listen(config.mysqlService.port, () => {
  console.log('Microservice MySQL connected of port:', config.mysqlService.port);
});
