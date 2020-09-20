const express = require('express');
const router = express.Router();
const userService = require('user/user.service');
const therapyService = require('./therapy.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const therapyPlanService = require('../therapy-plan/therapyPlan.service');

// routes
router.post('/', authorize([Role.Therapist]), create);
router.get('/:id', authorize(), getById);
router.get('/', authorize(), get);
router.put('/:id', authorize(Role.Therapist), update);
module.exports = router;

function create(req, res, next) {
  const currentUser = req.user;
  const therapy = { ...req.body, ['therapist']: currentUser.sub };

  userService
    .getById(req.body.client)
    .then(client => {
      if (!client.therapist || therapy.therapist !== client.therapist.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      therapyService
        .create(therapy)
        .then(therapy => res.json({ therapy, message: 'Therapy successfully created.' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

function get(req, res, next) {
  const currentUser = req.user;

  if (req.query.client) {
    therapyService
      .getClientsTherapy(req.query.client)
      .then(therapy => {
        // allow fetching clients therapy to this client and his therapist
        if (!therapy)
          return res.status(404).json({ message: 'Client has not started any therapy' });

        if (currentUser.sub !== therapy.therapist._id || currentUser.sub !== therapy.client._id)
          return res.status(401).json({ message: 'Unauthorized' });

        res.json({ therapy });
      })
      .catch(err => next(err));
  } else if (req.query.therapist) {
    console.log(currentUser);
    if (currentUser.role !== Role.Therapist)
      return res.status(401).json({ message: 'Unauthorized' });

    therapyService
      .getTherapistsTherapies(req.query.therapist)
      .then(therapies => res.json({ therapies }))
      .catch(err => next(err));
  }
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  therapyService
    .getById(id)
    .then(therapy => {
      if (therapy) {
        if (
          currentUser.sub !== therapy.client.toString() &&
          currentUser.sub !== therapy.therapist.toString()
        ) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json(therapy);
      }
      res.sendStatus(404);
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const currentUser = req.user;
  const therapy = req.body;

  // allow only therapist to create therapy
  if (therapy.therapist.toString() !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  therapyService
    .update(req.params.id, therapy)
    .then(updatedTherapy => {
      if (therapy.isInProgress === flase)
        therapyPlanService
          .update(updatedTherapy.therapy, { endTime: Date.now })
          .then(therapyPlan =>
            res.json({ therapy: updatedTherapy, message: 'Therapy successfully updated' })
          );
    })
    .catch(err => next(err));
}
