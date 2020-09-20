const express = require('express');
const router = express.Router();
const userService = require('user/user.service');
const therapyPlanService = require('./therapyPlan.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const therapyService = require('../therapy/therapy.service');

// routes
router.post('/', authorize([Role.Therapist]), create);
router.put('/:id', authorize(Role.Therapist), update);
module.exports = router;

function create(req, res, next) {
  const currentUser = req.user;
  const therapyPlan = { ...req.body, ['therapist']: currentUser.sub };

  userService
    .getById(req.body.client)
    .then(client => {
      if (!client.therapist || therapyPlan.therapist !== client.therapist.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      therapyPlanService
        .create(therapyPlan)
        .then(therapyPlan =>
          res.json({ therapyPlan, message: 'Therapy plan successfully created.' })
        )
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const currentUser = req.user;
  const therapyPlan = req.body;

  if (therapyPlan.therapy.therapist.toString() !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  therapyService.getById(therapyPlan.therapy).then(therapy => {
    if (!therapy.therapist || therapyPlan.therapist !== currentUser.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    therapyPlanService
      .update(therapyPlan)
      .then(therapyPlan => res.json({ therapyPlan, message: 'Therapy plan successfully updated.' }))
      .catch(err => next(err));
  });
}
