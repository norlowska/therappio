const express = require("express");
const router = express.Router();
const assignmentService = require("./assignment.service");
const authorize = require("_helpers/authorize");
const Role = require("_helpers/role");

// routes
router.post("/", authorize(Role.Therapist), create);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), update);
router.delete("/:id", authorize(Role.Therapist), _delete);
module.exports = router;

function create(req, res, next) {
  assignmentService
    .create(req.body)
    .then(assignment =>
      res.status(201).json({ message: "Assignment successfully created.", data: assignment })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  const currentUser = req.user;

  assignmentService
    .getAll()
    .then(assignments => {
      if (typeof req.query.client === "string") {
        assignments = assignments.filter(assignment => assignment.client.id === req.query.client);
      }
      // allow client to get assignments created for him/her
      // allow therapist to get assignments of his/her patients
      assignments = assignments.filter(
        assignment =>
          assignment.client.id === currentUser.sub ||
          assignment.client.therapist.toString() === currentUser.sub
      );

      res.json(assignments);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  assignmentService
    .getById(id)
    .then(assignment => {
      if (assignment) {
        if (
          assignment.client.therapist.toString() !== currentUser.sub &&
          assignment.client.id !== currentUser.sub
        ) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(assignment);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
}

// TODO: restrict
function update(req, res, next) {
  const currentUser = req.user;
  const newAssignment = req.body;

  assignmentService
    .getById(req.params.id)
    .then(assignment => {
      if (
        assignment.client.therapist.toString() !== currentUser.sub &&
        assignment.client.id !== currentUser.sub
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      assignmentService
        .update(req.params.id, newAssignment)
        .then(() => res.json({ message: "Assignment successfully deleted" }));
    })
    .catch(err => next(err));
}

function _delete(req, res, next) {
  const currentUser = req.user;
  assignmentService
    .getById(req.params.id)
    .then(assignment => {
      if (
        assignment.client.therapist.toString() !== currentUser.sub &&
        assignment.client.id !== currentUser.sub
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      assignmentService
        .delete(req.params.id)
        .then(() => res.json({ message: "Assignment successfully deleted" }));
    })
    .catch(err => next(err));
}
