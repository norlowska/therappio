const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const authorize = require("_helpers/authorize");
const { loginAttemptLimiter } = require("_helpers/limiter");
const Role = require("_helpers/role");

// routes
router.post("/login", loginAttemptLimiter, login);
router.post("/signup", signup);
router.get("/", authorize(Role.Admin), getAll);
router.get("/profile", authorize(), getProfile);
router.get("/:id", authorize(), getById);
router.post("/", authorize(Role.Admin), create);
router.put("/:id", authorize(), update);
router.delete("/:id", authorize(Role.Admin), _delete);
module.exports = router;

function login(req, res, next) {
  userService.login(req.body).then(user => {
    user ? res.json(user) : res.status(400).json({ message: "Login failed" });
  });
}

function signup(req, res, next) {
  userService
    .signup(req.body)
    .then(() => res.json({ message: "Signup succeeded" }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getProfile(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  userService
    .getById(req.params.id)
    .then(user => {
      if (user) {
        // allow therapist to get only his/her own or his/her patient's record
        if (
          currentUser.role === Role.Therapist &&
          id !== currentUser.sub &&
          (!user.therapist || currentUser.sub !== user.therapist.id)
        ) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
}

function create(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Account creation failed" }))
    .catch(err => next(err));
}

function update(req, res, next) {
  const currentUser = req.user;
  const id = req.params.id;

  // allow client to get only his/her own record
  if (currentUser.role === Role.Client && id !== currentUser.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  userService
    .getById(id)
    .then(user => {
      if (
        currentUser.role === Role.Therapist &&
        id !== currentUser.sub &&
        (!user.therapist || currentUser.sub !== user.therapist.id)
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      userService
        .update(req.params.id, req.body)
        .then(() => res.json({ message: "User successfully updated" }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

function _delete(req, res, next) {
  const id = req.params.id;

  userService
    .getById(id)
    .then(user => {
      userService
        .delete(id)
        .then(() => res.json({ message: "User successfully deleted" }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
