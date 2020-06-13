/**
 * @fileoverview Network manage for posts
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// POST ROUTER
router.get('/', listPosts);

// CALLBACKS
function listPosts(req, res, next) {
  controller.list()
    .then(data => {
      response.succes(req, res, data, 200);
    })
    .catch(next);
};

module.exports = router;
