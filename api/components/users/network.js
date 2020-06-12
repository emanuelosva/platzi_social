/**
 * @fileoverview Network manage for users
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const users = require('./index');

const router = express.Router();

// USER ROUTER
router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', upsertUser);
router.put('/', upsertUser);
router.delete('/:id', removeUser);

// CALLBACKS
function listUsers(req, res) {
  controller.list()
    .then(list => {
      response.succes(req, res, list, 200);
    })
    .catch(err => {
      response.error(req, res, '', 500, err);
    });
};

function getUser(req, res) {
  controller.get(req.params.id)
    .then(user => {
      response.succes(req, res, user, 200);
    })
    .catch(err => {
      response.error(req, res, '', 500, err);
    });
};

function upsertUser(req, res) {
  controller.upsert(req.body)
    .then(user => {
      response.succes(req, res, user, 201);
    })
    .catch(err => {
      response.error(req, res, '', 400, err);
    });
};

function removeUser(req, res) {
  controller.remove(req.params.id)
    .then(deleted => {
      response.succes(req, res, deleted, 200);
    })
    .catch(err => {
      response.error(req, res, '', 500, err);
    });
};

module.exports = router;
