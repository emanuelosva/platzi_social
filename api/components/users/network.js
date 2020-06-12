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
router.get('/', (req, res) => {
  controller.list()
    .then(list => {
      response.succes(req, res, list, 200);
    })
    .catch(err => {
      response.error(req, res, '', 500, err);
    });
});

router.get('/:id', (req, res) => {
  controller.get(req.params.id)
    .then(user => {
      response.succes(req, res, user, 200);
    })
    .catch(err => {
      response.error(req, res, '', 500, err);
    });
});

module.exports = router;
