/**
 * @fileoverview Mircroserver for Cache
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

// API DB
const express = require('express');
const bodyParser = require('body-parser')

const config = require('../config');
const router = require('./network');

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/', router);

app.listen(config.cacheService.port, () => {
  console.log('Cache redis service connected of port:', config.cacheService.port);
});
