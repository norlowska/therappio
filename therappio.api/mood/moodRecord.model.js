const mongoose = require("mongoose");
const nanoid = require("nanoid");
const { Schema } = mongoose;

const moods = [
  "alert",
  "excited",
  "elated",
  "happy",
  "tense",
  "nervous",
  "stressed",
  "upset",
  "sad",
  "depressed",
  "bored",
  "fatigued",
  "content",
  "serene",
  "relaxed",
  "calm"
];
const moodQuadrant = [1, 2, 3, 4];

const MoodRecordSchema = new Schema({
  _id: { type: String, default: () => nanoid() },
  client: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  mood: {
    name: { type: String, enum: moods },
    quadrant: { type: Number, enum: moodQuadrant }
  },
  comment: String
});

module.exports = mongoose.model("MoodRecord", MoodRecordSchema);
