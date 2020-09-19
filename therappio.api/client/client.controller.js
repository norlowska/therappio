const express = require("express");
const router = express.Router();
const authorize = require("_helpers/authorize");
const Role = require("_helpers/role");

// routes
router.get("/", authorize(Role.Therapist), getAll);
router.get("/:id", authorize([Role.Therapist, Role.Client]), getById);
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

function create(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Account creation success" }))
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.body._id;
  const currentUser = req.user;

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
        (!client.therapist || client.therapist.id !== currentUser.sub)
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      clientService
        .update(req.params.id, req.body)
        .then((client) => res.json({ client, message: "Client successfully updated" }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
