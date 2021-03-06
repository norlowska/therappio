const mongoose = require('mongoose');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const TherapySchema = new Schema({
  _id: { type: String, default: () => nanoid() },
  patient: { type: String, ref: 'User', required: true },
  therapist: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  isInProgress: { type: Boolean, default: true },
  plans: [{ type: String, ref: 'TherapyPlan' }],
  startTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Therapy', TherapySchema);
