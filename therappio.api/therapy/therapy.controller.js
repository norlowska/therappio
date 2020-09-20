const express = require('express');
const dateFns = require('date-fns');
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
  const { client, interval, ...therapyPlan } = req.body;

  userService
    .getById(req.body.client)
    .then(client => {
      if (!client.therapist || currentUser.sub !== client.therapist.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (interval.type === 'days') {
        const newInterval = dateFns.differenceInSeconds(
          dateFns.addDays(new Date(), interval.value),
          new Date()
        );

        therapyPlanService
          .create({ ...therapyPlan, interval: newInterval })
          .then(createdTherapyPlan => {
            const therapy = {
              client,
              therapist: currentUser.sub,
              plans: [createdTherapyPlan.id],
            };

            therapyService
              .create(therapy)
              .then(createdTherapy =>
                res.json({ therapy: createdTherapy, message: 'Therapy successfully created.' })
              );
          });
      } else {
        let addTherapyPlans = interval.value.map(item => {
          const newStartTime = getClosestDayOfWeek(item.id, new Date(therapyPlan.startTime));
          const newInterval = dateFns.differenceInSeconds(
            dateFns.addDays(new Date(), 7),
            new Date()
          );

          return therapyPlanService
            .create({ ...therapyPlan, startTime: newStartTime, interval: newInterval })
            .then(createdTherapyPlan => createdTherapyPlan._id);
        });

        Promise.all(addTherapyPlans).then(plans => {
          const therapy = { client, therapist: currentUser.sub, plans };
          therapyService.create(therapy).then(createdTherapy => {
            createdTherapy.plans.forEach(item =>
              therapyPlanService.update(item._id, { therapy: createdTherapy._id })
            );
            res.json({ therapy: createdTherapy, message: 'Therapy successfully created.' });
          });
        });
      }
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
      if (therapy.isInProgress === false) {
        let updatedPlans = updatedTherapy.plans.map(item =>
          therapyPlanService
            .update(updatedTherapy.therapy, { endTime: Date.now })
            .then(therapyPlan => therapyPlan._id)
        );
        Promise.all(updatedPlans).then(plans =>
          res.json({ therapy: updatedTherapy, message: 'Therapy successfully ended!' })
        );
      }

      res.json({ therapy: updatedTherapy, message: 'Therapy successfully updated' });
    })
    .catch(err => next(err));
}

function getClosestDayOfWeek(dayOfWeek, fromDate = new Date()) {
  const startDateDayOfWeek = dateFns.getISODay(fromDate);

  if (dateFns.format(fromDate, 'dd/MM/yyyy') === dateFns.format(new Date(), 'dd/MM/yyyy'))
    return fromDate;

  const offsetDays = 7 + (dayOfWeek + startDateDayOfWeek);

  return dateFns.addDays(fromDate, offsetDays);
}
