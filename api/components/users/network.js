/**
 * @fileoverview Network manage for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const response = require('../../../network/response');
const controller = require('./controller');

const router = express.Router();

// USER ROUTER
router.get('/', (req, res) => {
  const list = controller.list();
  response.succes(req, res, list, 200);
});

module.exports = router;
