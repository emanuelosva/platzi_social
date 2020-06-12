/**
 * @fileoverview Server api
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

const express = require('express');
const bodyParser = require('body-parser')

const swaggerUi = require('swagger-ui-express');

const config = require('../config');
const user = require('./components/users/network');
const swaggerDoc = require('./swagger.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(config.api.port, () => {
  console.log(`API listen on port: http://localhost:${config.api.port}`);
});