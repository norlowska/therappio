const mongoose = require("mongoose");
const nanoid = require("nanoid");
const { Schema } = mongoose;

const types = ["diary", "gratitude"];

const JournalRecordSchema = new Schema({
  _id: { type: String, default: () => nanoid() },
  client: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  content: String,
  type: { type: String, enum: types, required: true }
});

module.exports = mongoose.model("JournalRecord", JournalRecordSchema);
