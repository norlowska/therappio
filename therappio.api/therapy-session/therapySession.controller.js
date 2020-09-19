const express = require("express");
const router = express.Router();
const userService = require("user/user.service");
const therapySessionService = require("./therapySession.service");
const authorize = require("_helpers/authorize");
const Role = require("_helpers/role");

// routes
router.post("/", authorize([Role.Therapist]), create);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(Role.Therapist), update);
router.delete("/:id", authorize(Role.Therapist), _delete);
module.exports = router;

function create(req, res, next) {
  const currentUser = req.user;
  const session = { ...req.body, ["therapist"]: currentUser.sub };

  userService
    .getById(req.body.client)
    .then(client => {
      if (!client.therapist || session.therapist !== client.therapist.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      therapySessionService
        .create(session)
        .then(newSession =>
          res.json({ session: newSession, message: "Therapy session successfully created." })
        )
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

function getAll(req, res, next) {
  const currentUser = req.user;

  therapySessionService
    .getAll()
    .then(sessions => {
      if (typeof req.query.client === "string") {
        sessions = sessions.filter(
          session => session.client.id === req.query.client
        );
      }

      if (typeof req.query.therapist === "string") {
        sessions = sessions.filter(
          session => session.therapist.id === req.query.therapist
        );
      }
      // allow therapist to get session lead by him/her
      // allow client to get session he/she attended to
      sessions = sessions.filter(
        session =>
          session.therapist.toString() === currentUser.sub ||
          session.client.toString() === currentUser.sub
      );

      res.json(sessions);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  therapySessionService
    .getById(id)
    .then(session => {
      if (session) {
        if (
          currentUser.sub !== session.client.toString() &&
          currentUser.sub !== session.therapist.toString()
        ) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(session);
      }
      res.sendStatus(404);
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const currentUser = req.user;
  const session = req.body;

  if (session.therapist.toString() !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  therapySessionService
    .update(req.params.id, session)
    .then(session => res.json({ session, message: "Therapy session successfully updated" }))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  const currentUser = req.user;

  therapySessionService
    .getById(req.params.id)
    .then(session => {
      if (session.therapist.toString() !== currentUser.sub) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      therapySessionService
        .delete(req.params.id)
        .then(() =>
          res.json({ id: req.params.id, message: "Therapy session successfully deleted" })
        )
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
