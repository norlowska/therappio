const express = require('express');
const router = express.Router();
const icd10CodeService = require('./icd10Code.service');
const authorize = require('_helpers/authorize');

// routes
router.get('/', authorize(), function get(req, res, next) {
  if (req.query.codes)
    return icd10CodeService
      .getCodes(req.query.codes.split(','))
      .then(icd10Codes => res.json(icd10Codes))
      .catch(err => next(err));

  return icd10CodeService
    .query(req.query.q || '')
    .then(icd10Codes => res.json(icd10Codes))
    .catch(err => next(err));
});
module.exports = router;
