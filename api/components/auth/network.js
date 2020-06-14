/**
 * @fileoverview Network manage for authentication
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// AUTH ROUTER
router.post('/login', (req, res, next) => {
  controller.login(req.body.username, req.body.password)
    .then(token => {
      response.succes(req, res, token, 200);
    })
    .catch(next);
})

module.exports = router;
