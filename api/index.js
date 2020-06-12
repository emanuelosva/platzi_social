/**
 * @fileoverview Server api
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

const express = require('express');
const config = require('../config');
const user = require('./components/users/network');

const app = express();

// ROUTES
app.use('/api/user', user);


app.listen(config.api.port, () => {
  console.log(`API listen on port: http://localhost:${config.api.port}`);
});