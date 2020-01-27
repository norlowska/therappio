require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("_helpers/error-handler");

// TODO: set rate-limiter-flexible
// Setting HTTP response header
app.use(helmet());
// Data Sanitization against XSS
app.use(xss());
app.use(mongoSanitize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
// app.use("/auth", require("auth/auth.controller"));
app.use("/users", require("user/user.controller"));
app.use("/clients", require("client/client.controller"));
app.use("/sessions", require("therapy-session/therapySession.controller"));
app.use("/journal", require("journal/journalRecord.controller"));
app.use("/moods", require("mood/moodRecord.controller"));
app.use("/assignments", require("assignment/assignment.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
