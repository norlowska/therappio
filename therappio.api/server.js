require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('_helpers/error-handler');
const { apiLimiter, icd10limiter } = require('_helpers/limiter');

// Setting HTTP response header
app.use(helmet());
// Data Sanitization against SQLi
app.use(mongoSanitize());
// Limiting number of requests
app.use(apiLimiter);
// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10kb' }));
// Enable CORS
app.use(cors({ origin: 'http://localhost:8080' }));

// api routes
// app.use("/auth", require("auth/auth.controller"));
app.use('/users', require('user/user.controller'));
app.use('/patients', require('patient/patient.controller'));
app.use('/sessions', require('therapy-session/therapySession.controller'));
app.use('/journal', require('journal/journalRecord.controller'));
app.use('/moods', require('mood/moodRecord.controller'));
app.use('/assignments', require('assignment/assignment.controller'));
app.use('/icd10', require('icd10-code/icd10Code.controller'), icd10limiter);
app.use('/diagnosis', require('diagnosis/diagnosis.controller'));
app.use('/therapy', require('therapy/therapy.controller'));
app.use('/therapy-plan', require('therapy-plan/therapyPlan.controller'));

// global error handler
app.use(errorHandler);

// start server
// const port = process.env.NODE_ENV === 'production' ? 3000 : 4000;
const port = 3000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
