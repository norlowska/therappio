const express = require('express');
const router = express.Router();
const journalRecordService = require('./journalRecord.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.post('/', authorize(Role.Client), create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(Role.Client), update);
router.delete('/:id', authorize(Role.Client), _delete);
module.exports = router;

function create(req, res, next) {
  const currentUser = req.user;
  const record = { ...req.body, ['client']: currentUser.sub };

  journalRecordService
    .create(record)
    .then(() => res.json({ message: 'Journal record successfully created.' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  const currentUser = req.user;

  journalRecordService
    .getAll()
    .then(records => {
      if (typeof req.query.client === 'string') {
        records = records.filter(
          record => record && record.client && record.client.id === req.query.client
        );
      }

      // allow client to get his/her mood records
      // allow therapist to get mood records of his/her patients
      records = records.filter(
        record =>
          record &&
          record.client &&
          record.client.therapist &&
          (record.client._id === currentUser.sub ||
            record.client.therapist.toString() === currentUser.sub)
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
          currentUser.sub !== record.client.id &&
          currentUser.sub !== record.client.therapist.toString()
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
      if (record.client.id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      journalRecordService
        .update(req.params.id, { ...req.body, ['client']: currentUser.sub })
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
      if (record.client.id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      journalRecordService
        .delete(req.params.id)
        .then(() => res.json({ message: 'Journal record successfully deleted' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
