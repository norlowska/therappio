const express = require('express');
const dateFns = require('date-fns');
const rrule = require('rrule');
const router = express.Router();
const userService = require('user/user.service');
const therapyService = require('./therapy.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const therapyPlanService = require('../therapy-plan/therapyPlan.service');
const db = require('_helpers/db');
const Therapy = require('./therapy.model');

// routes
router.post('/', authorize([Role.Therapist]), create);
router.get('/:id', authorize(), getById);
router.get('/', authorize(), get);
router.put('/:id', authorize(Role.Therapist), update);
module.exports = router;

function create(req, res, next) {
  const currentUser = req.user;
  const { patient, interval, ...therapyPlan } = req.body;

  userService
    .getById(req.body.patient)
    .then(patient => {
      if (!patient.therapist || currentUser.sub !== patient.therapist.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (interval.type === 'days') {
        therapyPlanService
          .create({ ...therapyPlan, interval: interval.value })
          .then(createdTherapyPlan => {
            const therapy = {
              patient,
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
          return therapyPlanService
            .create({ ...therapyPlan, startTime: newStartTime, interval: 7 })
            .then(createdTherapyPlan => createdTherapyPlan._id);
        });

        Promise.all(addTherapyPlans).then(plans => {
          const therapy = { patient, therapist: currentUser.sub, plans };
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
  let match = [];
  if (req.query.patient) {
    match.push({ patient: req.query.patient });
  }

  if (req.query.therapist) {
    match.push({ therapist: req.query.therapist });
  }

  return Therapy.aggregate([
    {
      $lookup: { from: 'therapyplans', localField: 'plans', foreignField: '_id', as: 'plansDocs' },
    },
    { $lookup: { from: 'users', localField: 'patient', foreignField: '_id', as: 'patientObj' } },
    { $unwind: '$patientObj' },
    { $match: { $and: match } },
  ])

    .then(therapies => {
      if (req.query.from && req.query.to) {
        const newTherapies = therapies
          .map(therapy => {
            const newPlansDocs = therapy.plansDocs
              .map(plan => {
                const sessions = new rrule.RRule({
                  freq: rrule.RRule.DAILY,
                  interval: plan.interval,
                  dtstart: new Date(plan.startTime),
                  until: plan.endTime ? plan.endTime : new Date(req.query.to),
                }).between(new Date(req.query.from), new Date(req.query.to));
                if (sessions.length) return { ...plan, sessions };
                return plan;
              })
              .filter(
                item =>
                  item !== undefined && item.hasOwnProperty('sessions') && item.sessions.length
              );
            if (newPlansDocs.length) return { ...therapy, plansDocs: newPlansDocs };
          })
          .filter(item => item);
        return res.json({ therapies: newTherapies });
      }
      res.json({ therapies });
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  therapyService
    .getById(id)
    .then(therapy => {
      if (therapy) {
        if (
          currentUser.sub !== therapy.patient.toString() &&
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
