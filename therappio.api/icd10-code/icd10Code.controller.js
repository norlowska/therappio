const express = require('express');
const router = express.Router();
const icd10CodeService = require('./icd10Code.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.get('/', authorize(), get);
module.exports = router;

function get(req, res, next) {
  if (!req.query.code && !req.query.id)
    icd10CodeService
      .getAll()
      .then(icd10Codes => res.json(icd10Codes))
      .catch(err => next(err));

  if (req.query.id)
    icd10CodeService
      .getById(req.query.id)
      .then(icd10Codes => res.json(icd10Codes))
      .catch(err => next(err));

  if (req.query.code)
    icd10CodeService
      .getByFullCode(req.query.code)
      .then(icd10Codes => res.json(icd10Codes))
      .catch(err => next(err));
}
