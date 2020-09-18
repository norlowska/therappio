require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("_helpers/error-handler");
const { apiLimiter } = require("_helpers/limiter");

// Setting HTTP response header
app.use(helmet());
// Data Sanitization against XSS
app.use(xss());
// Data Sanitization against SQLi
app.use(mongoSanitize());
// Limiting number of requests
app.use(apiLimiter);
// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10kb" }));
// Enable CORS
app.use(cors({ origin: 'http://localhost:8080' }));

// api routes
// app.use("/auth", require("auth/auth.controller"));
app.use("/users", require("user/user.controller"));
app.use("/clients", require("client/client.controller"));
app.use("/sessions", require("therapy-session/therapySession.controller"));
app.use("/journal", require("journal/journalRecord.controller"));
app.use("/moods", require("mood/moodRecord.controller"));
app.use("/assignments", require("assignment/assignment.controller"));
app.use("/icd10", require("icd10-code/icd10Code.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
