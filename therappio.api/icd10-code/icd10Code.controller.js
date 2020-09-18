const express = require('express');
const router = express.Router();
const icd10CodeService = require('./icd10Code.service');
const authorize = require('_helpers/authorize');

// routes
router.get('/', authorize(), function get(req, res, next) {
  icd10CodeService
    .query(req.query.q || '')
    .then(icd10Codes => {
      return res.json(icd10Codes);
    })
    .catch(err => next(err));
});
module.exports = router;
