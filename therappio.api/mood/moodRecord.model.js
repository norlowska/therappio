const mongoose = require("mongoose");

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
  client: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true },
  mood: {
    name: { type: String, enum: moods },
    quadrant: { type: Number, enum: moodQuadrant }
  },
  comment: String
});

module.exports = mongoose.model("MoodRecord", MoodRecordSchema);
