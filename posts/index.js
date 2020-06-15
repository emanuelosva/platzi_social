/**
 * @fileoverview Server Posts
 * 
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

const express = require('express');
const bodyParser = require('body-parser')

const config = require('../config');
const post = require('./components/posts/network');
const errors = require('../network/errors');

const app = express();
app.use(bodyParser.json());

// ROUTES
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log(`Microservice Post listen on port: http://localhost:${config.post.port}`);
});
