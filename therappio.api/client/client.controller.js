const express = require("express");
const router = express.Router();
const clientService = require("./client.service");
const moodRecordService = require("../mood/moodRecord.service");
const journalRecordService = require("../journal/journalRecord.service");
const assignmentService = require("../assignment/assignment.service");
const therapySessionService = require("../therapy-session/therapySession.service");
const authorize = require("_helpers/authorize");
const Role = require("_helpers/role");

// routes
router.get("/", authorize(Role.Therapist), getAll);
router.get("/:id", authorize([Role.Therapist, Role.Client]), getById);
router.get("/:id/moods", authorize([Role.Therapist, Role.Client]), getMoods);
router.get("/:id/journal", authorize([Role.Therapist, Role.Client]), getJournalRecords);
router.get("/:id/assignments", authorize([Role.Therapist, Role.Client]), getAssignments);
router.get("/:id/sessions", authorize([Role.Therapist, Role.Client]), getTherapySessions);
router.post("/", authorize(Role.Therapist), create);
router.put("/:id", authorize([Role.Therapist, Role.Client]), update);
module.exports = router;

function getAll(req, res, next) {
  const currentUser = req.user;

  clientService
    .getAll()
    .then(clients => {
      // allow therapist to get his/her clients'
      clients = clients.filter(
        client => client.therapist && client.therapist.id === currentUser.sub
      );

      res.json(clients);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  clientService
    .getById(req.params.id)
    .then(client => {
      if (client) {
        // allow therapist to get only his/her patient's record
        if (
          currentUser.role === Role.Therapist &&
          (!client.therapist || client.therapist.id === currentUser.sub)
        ) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(client);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
}

function getMoods(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  moodRecordService
    .getClientsMoods(id)
    .then(records => {
      // allow therapist to get only his client's records
      if (
        records.length &&
        currentUser.role === Role.Therapist &&
        records[0].client.therapist.toString() !== currentUser.sub
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.json(records);
    })
    .catch(err => next(err));
}

function getJournalRecords(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  journalRecordService
    .getClientsRecords(id)
    .then(records => {
      // allow therapist to get only his client's records
      if (
        records.length &&
        currentUser.role === Role.Therapist &&
        records[0].client.therapist.toString() !== currentUser.sub
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.json(records);
    })
    .catch(err => next(err));
}

function getAssignments(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  assignmentService
    .getClientsAssignments(id)
    .then(assignments => {
      // allow therapist to get only his client's assignments
      if (
        assignments.length &&
        currentUser.role === Role.Therapist &&
        assignments[0].client.therapist.toString() !== currentUser.sub
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.json(assignments);
    })
    .catch(err => next(err));
}

function getTherapySessions(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  therapySessionService
    .getClientsSessions(id)
    .then(sessions => {
      // allow therapist to get only his client's sessions
      if (
        sessions.length &&
        currentUser.role === Role.Therapist &&
        sessions[0].therapist.toString() !== currentUser.sub
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.json(sessions);
    })
    .catch(err => next(err));
}

function create(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Account creation success" }))
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.client.id;

  // allow client to update only his/her record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  clientService
    .getById(id)
    .then(client => {
      // allow therapist to update only his/her patient's record
      if (
        currentUser.role === Role.Therapist &&
        (!client.therapist || client.therapist.id === currentUser.sub)
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      clientService
        .update(req.params.id, req.body)
        .then(() => res.json({ message: "Client successfully updated" }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
