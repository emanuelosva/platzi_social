/**
 * @fileoverview Network manage for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const authenticate = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// USER ROUTER
router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', upsertUser);
router.put('/', authenticate('update'), upsertUser);
router.delete('/:id', removeUser);

// CALLBACKS
function listUsers(req, res, next) {
  controller.list()
    .then(list => {
      response.succes(req, res, list, 200);
    })
    .catch(next);
};

function getUser(req, res, next) {
  controller.get(req.params.id)
    .then(user => {
      response.succes(req, res, user, 200);
    })
    .catch(next);
};

function upsertUser(req, res, next) {
  controller.upsert(req.body)
    .then(user => {
      response.succes(req, res, user, 201);
    })
    .catch(next);
};

function removeUser(req, res, next) {
  controller.remove(req.params.id)
    .then(deleted => {
      response.succes(req, res, deleted, 200);
    })
    .catch(next);
};

module.exports = router;
