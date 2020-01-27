const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionTypes = [
  "short",
  "long",
  "number",
  "slider",
  "single-choice",
  "multi-choice",
  "select",
  "date",
  "time",
  "datetime"
];

const TaskSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, enum: questionTypes, required: true },
  answer: [String],
  options: [String]
});

const AssignmentSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  fields: [TaskSchema]
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
