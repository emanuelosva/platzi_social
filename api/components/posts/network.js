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
router.get('/:id', getPost);
router.post('/', upsertPost);
router.put('/', upsertPost);
router.delete('/:id', removePost);


// CALLBACKS
function listPosts(req, res, next) {
  controller.list()
    .then(data => {
      response.succes(req, res, data, 200);
    })
    .catch(next);
};

function getPost(req, res, next) {
  controller.get(req.params.id)
    .then(data => {
      response.succes(req, res, data, 200);
    })
    .catch(next);
};

function upsertPost(req, res, next) {
  controller.upsert(req.body)
    .then(data => {
      response.succes(req, res, data, 200);
    })
    .catch(next);
};

function removePost(req, res, next) {
  controller.remove(req.params.id)
    .then(data => {
      response.succes(req, res, data, 200);
    })
    .catch(next);
};

module.exports = router;
