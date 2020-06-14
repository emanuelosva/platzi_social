/**
 * @fileoverview Network manage for MySQL server
 *
 * @version 1.0
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 *
*/

const express = require('express');

const response = require('../network/response');
const store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', upsert);
router.put('/:table', upsert);
router.post('/:table/query', query);
router.delete('/:table/:id', remove);

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

async function update(req, res, next) {
  try {
    const data = await store.update(req.params.table, req.body);
    response.succes(req, res, data, 200);
  } catch (err) {
    console.log(`[db microservice] Error -> ${err.message}`);
    response.error(req, res, '', 500, '');
  }
};

async function remove(req, res, next) {
  try {
    const data = await store.remove(req.params.table, req.params.id);
    response.succes(req, res, data, 200);
  } catch (err) {
    console.log(`[db microservice] Error -> ${err.message}`);
    response.error(req, res, '', 500, '');
  }
};

async function query(req, res, next) {
  try {
    const data = await store.query(req.params.table, req.body.query, req.body.join);
    response.succes(req, res, data, 200);
  } catch (error) {
    response.error(req, res, '', 500, '');
  }
};

module.exports = router;
