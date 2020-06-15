/**
 * @fileoverview Network manage for Cache server
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const response = require('../network/response');
const store = require('../store/redis');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);

async function list(req, res, next) {
  try {
    const data = await store.list(req.params.table);
    response.succes(req, res, data, 200);
  } catch (err) {
    console.log(`[db microservice] Error -> ${err.message}`);
    response.error(req, res, '', 500, '');
  }
};

async function get(req, res, next) {
  try {
    const data = await store.get(req.params.table, req.params.id);
    response.succes(req, res, data, 200);
  } catch (err) {
    console.log(`[db microservice] Error -> ${err.message}`);
    response.error(req, res, '', 500, '');
  }
};

async function upsert(req, res, next) {
  try {
    const data = await store.upsert(req.params.table, req.body);
    response.succes(req, res, data, 200);
  } catch (err) {
    console.log(`[db microservice] Error -> ${err.message}`);
    response.error(req, res, '', 500, '');
  }
};

module.exports = router;
