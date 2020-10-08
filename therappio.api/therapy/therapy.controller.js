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
              plans: [createdTherapyPlan._id],
              plansDocs: [createdTherapyPlan],
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
          console.log(newStartTime);
          return therapyPlanService
            .create({ ...therapyPlan, startTime: newStartTime, interval: 7 })
            .then(createdTherapyPlan => createdTherapyPlan);
        });

        Promise.all(addTherapyPlans).then(plans => {
          const therapy = { patient, therapist: currentUser.sub, plans };
          therapyService.create(therapy).then(createdTherapy => {
            createdTherapy.plans.forEach(item =>
              therapyPlanService.update(item._id, { therapy: createdTherapy._id })
            );

            const newTherapy = {
              ...createdTherapy,
              plans: plans.map(item => item._id),
              plansDocs: plans,
            };
            console.log('newTherapy', newTherapy);

            res.json({
              therapy: newTherapy,
              message: 'Therapy successfully created.',
            });
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
                return null;
              })
              .filter(
                item =>
                  item !== undefined &&
                  item != null &&
                  item.hasOwnProperty('sessions') &&
                  item.sessions.length > 0
              );
            if (newPlansDocs.length) return { ...therapy, plansDocs: newPlansDocs };
            return null;
          })
          .filter(item => item !== null && item !== undefined);
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
  const { startTime, interval, ...therapy } = req.body;

  // allow only therapist to create therapy
  if (therapy.therapist.toString() !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (interval.type === 'days') {
    therapyPlanService
      .update(therapy.plans[0], { startTime, interval: interval.value })
      .then(async therapyPlan => {
        const updatedTherapy = await therapyService.update(req.params.id, {
          ...therapy,
          startTime,
          plans: [therapyPlan._id],
        });
        console.log({ ...updatedTherapy, plansDocs: [therapyPlan] });
        res.json({
          therapy: { ...updatedTherapy, plansDocs: [therapyPlan] },
          message: 'Therapy successfully updated',
        });
      })
      .catch(err => next(err));
  } else {
    let createdPlans = interval.value.map(item => {
      const newPlan = {
        startTime: getClosestDayOfWeek(item.id, new Date(startTime)),
        interval: 7,
      };
      if (!therapy.isInProgress) newPlan.endTime = Date.now;
      return therapyPlanService.create(newPlan).then(therapyPlan => {
        return therapyPlan._id;
      });
    });

    let deletedPlans = therapy.plans.map(item => therapyPlanService.delete(item));

    Promise.all(createdPlans.concat(deletedPlans))
      .then(plans =>
        therapyService
          .update(req.params.id, { ...therapy, plans: plans.filter(item => !!item) })
          .then(updatedTherapy => {
            res.json({
              therapy: { ...updatedTherapy, startTime, plans, plansDocs: updatedTherapy.plans },
              message: 'Therapy successfully updated!',
            });
          })
      )
      .catch(err => next(err));
  }
}

function getClosestDayOfWeek(dayOfWeek, fromDate = new Date()) {
  const startDateDayOfWeek = dateFns.getISODay(fromDate);

  if (
    dateFns.format(fromDate, 'dd/MM/yyyy') === dateFns.format(new Date(), 'dd/MM/yyyy') &&
    startDateDayOfWeek === dayOfWeek
  )
    return fromDate;

  const offsetDays = (7 + dayOfWeek - startDateDayOfWeek) % 7;

  return dateFns.addDays(fromDate, offsetDays);
}
