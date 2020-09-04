const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0,
  message: "Too many requests"
});

const loginAttemptLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100,
  message: "Too many login requests. Please try again after an hour"
});

module.exports = {loginAttemptLimiter, apiLimiter};
