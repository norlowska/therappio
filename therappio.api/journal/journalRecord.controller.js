const express = require('express');
const router = express.Router();
const journalRecordService = require('./journalRecord.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.post('/', authorize(Role.Patient), create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(Role.Patient), update);
router.delete('/:id', authorize(Role.Patient), _delete);
module.exports = router;

function create(req, res, next) {
  const currentUser = req.user;
  const record = { ...req.body, ['patient']: currentUser.sub };

  journalRecordService
    .create(record)
    .then(data => res.json({ data, message: 'Journal record successfully created.' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  const currentUser = req.user;

  journalRecordService
    .getAll()
    .then(records => {
      if (typeof req.query.patient === 'string') {
        records = records.filter(
          record => record && record.patient && record.patient.id === req.query.patient
        );
      }

      // allow patient to get his/her mood records
      // allow therapist to get mood records of his/her patients
      records = records.filter(
        record =>
          record &&
          record.patient &&
          record.patient.therapist &&
          (record.patient._id === currentUser.sub ||
            record.patient.therapist.toString() === currentUser.sub)
      );

      res.json(records);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  journalRecordService
    .getById(id)
    .then(record => {
      if (record) {
        if (
          currentUser.sub !== record.patient.id &&
          currentUser.sub !== record.patient.therapist.toString()
        ) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json(record);
      }
      res.sendStatus(404);
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const currentUser = req.user;

  journalRecordService
    .getById(req.params.id)
    .then(record => {
      if (record.patient.id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      journalRecordService
        .update(req.params.id, { ...req.body, ['patient']: currentUser.sub })
        .then(() => res.json({ message: 'Journal record successfully updated' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

function _delete(req, res, next) {
  const currentUser = req.user;

  journalRecordService
    .getById(req.params.id)
    .then(record => {
      if (record.patient.id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      journalRecordService
        .delete(req.params.id)
        .then(() => res.json({ message: 'Journal record successfully deleted' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
