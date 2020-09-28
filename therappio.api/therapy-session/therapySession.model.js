const mongoose = require('mongoose');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const TherapySessionSchema = new Schema({
  _id: { type: String, default: () => nanoid() },
  session_no: { type: Number, min: 0, required: true },
  patient: { type: String, ref: 'User', required: true },
  therapist: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  date: { type: Date, required: true },
  notes: { type: String, default: '' },
  tags: [String],
});

module.exports = mongoose.model('TherapySession', TherapySessionSchema);
