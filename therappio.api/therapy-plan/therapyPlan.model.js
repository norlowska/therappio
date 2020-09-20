const mongoose = require('mongoose');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const TherapyPlanSchema = new Schema({
  _id: { type: String, default: () => nanoid() },
  startTime: { type: Date, required: true },
  interval: { type: Number, required: true },
  endTime: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TherapyPlan', TherapyPlanSchema);
