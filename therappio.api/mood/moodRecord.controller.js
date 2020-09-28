const express = require('express');
const router = express.Router();
const moodRecordService = require('./moodRecord.service');
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

  moodRecordService
    .create(record)
    .then(() => res.json({ message: 'Mood record successfully created.' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  const currentUser = req.user;
  moodRecordService
    .getAll()
    .then(records => {
      // allow patient to get his/her mood records
      // allow therapist to get his/her patients' record
      records = records.filter(
        record =>
          record &&
          record.patient &&
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

  moodRecordService
    .getById(id)
    .then(record => {
      // allow patient to get his/her mood record
      // allow therapist to get his/her patient's record
      if (
        currentUser.sub !== record.patient.toString() &&
        currentUser.sub !== record.patient.therapist.toString()
      ) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      res.json(record);
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const currentUser = req.user;

  moodRecordService
    .getById(req.params.id)
    .then(record => {
      if (record.patient.id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      moodRecordService
        .update(req.params.id, { ...req.body, ['patient']: currentUser.sub })
        .then(() => res.json({ message: 'Mood record successfully updated' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

function _delete(req, res, next) {
  const currentUser = req.user;

  moodRecordService
    .getById(req.params.id)
    .then(record => {
      if (record.patient.id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      moodRecordService
        .delete(req.params.id)
        .then(() => res.json({ message: 'Mood record successfully deleted' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
