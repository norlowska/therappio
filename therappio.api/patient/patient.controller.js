const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const patientService = require('patient/patient.service');

// routes
router.get('/', authorize(Role.Therapist), getAll);
router.get('/:id', authorize([Role.Therapist, Role.Patient]), getById);
router.post('/', authorize(Role.Therapist), create);
router.put('/:id', authorize([Role.Therapist, Role.Patient]), update);
module.exports = router;

function getAll(req, res, next) {
  const currentUser = req.user;

  patientService
    .getAll()
    .then(patients => {
      // allow therapist to get his/her patients'
      patients = patients.filter(
        patient => patient.therapist && patient.therapist.id === currentUser.sub
      );

      res.json(patients);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow patient to get only his/her own record
  if (currentUser.role === Role.Patient && id !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  patientService
    .getById(req.params.id)
    .then(patient => {
      if (patient) {
        // allow therapist to get only his/her patient's record
        if (
          currentUser.role === Role.Therapist &&
          (!patient.therapist || patient.therapist.id === currentUser.sub)
        ) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json(patient);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
}

function create(req, res, next) {
  patientService
    .create(req.body)
    .then(patient => res.json({ patient, message: 'Patient creation success' }))
    .catch(err => next(err));
}

function update(req, res, next) {
  console.log('patient update request', req.body);
  const id = req.body._id;
  const currentUser = req.user;

  // allow patient to update only his/her record
  if (currentUser.role === Role.Patient && id !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  patientService
    .getById(id)
    .then(patient => {
      console.log('patient update resolved');
      // allow therapist to update only his/her patient's record
      if (
        currentUser.role === Role.Therapist &&
        (!patient.therapist || patient.therapist.id !== currentUser.sub)
      ) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      patientService
        .update(req.params.id, req.body)
        .then(patient => res.json({ patient, message: 'Patient successfully updated' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
