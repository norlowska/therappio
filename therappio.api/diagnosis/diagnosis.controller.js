const express = require('express');
const router = express.Router();
const diagnosisService = require('./diagnosis.service');
const userService = require('user/user.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.get('/:id', authorize(), function get(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  diagnosisService
    .getById(id)
    .then(diagnosis => {
      if (diagnosis) {
        if (
          diagnosis.client.therapist.toString() !== currentUser.sub &&
          diagnosis.client.id !== currentUser.sub
        ) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json(diagnosis);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
});

router.post('/', authorize(Role.Therapist), function create(req, res, next) {
  const clientId = req.body.client;

  diagnosisService
    .create(req.body)
    .then(diagnosis =>
      userService
        .update(clientId, { diagnosis: diagnosis.id })
        .then(user =>
          res.status(201).json({ message: 'Diagnosis successfully created.', data: diagnosis })
        )
    )
    .catch(err => next(err));
});

router.put('/:id', authorize(Role.Therapist), function update(req, res, next) {
  const currentUser = req.user;
  const newDiagnosis = req.body;

  diagnosisService
    .getById(req.params.id)
    .then(diagnosis => {
      if (
        diagnosis.client.therapist.toString() !== currentUser.sub &&
        diagnosis.client._id !== currentUser.sub
      ) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      diagnosisService
        .update(req.params.id, newDiagnosis)
        .then(diagnosis => res.json({ diagnosis, message: 'Diagnosis successfully updated' }));
    })
    .catch(err => next(err));
});

module.exports = router;
