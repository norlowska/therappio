const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 4 * 60 * 1000,
  max: 1000,
  delayMs: 0,
  message: 'Too many requests',
});

const icd10limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 500,
  delayMs: 0,
  message: 'Too many requests',
});

const loginAttemptLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100,
  message: 'Too many login requests. Please try again after an hour',
});

module.exports = { loginAttemptLimiter, apiLimiter, icd10limiter };
