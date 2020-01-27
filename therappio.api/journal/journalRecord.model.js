const mongoose = require("mongoose");

const { Schema } = mongoose;
const types = ["diary", "gratitude"];

const JournalRecordSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true },
  content: String,
  type: { type: String, enum: types, required: true }
});

module.exports = mongoose.model("JournalRecord", JournalRecordSchema);
