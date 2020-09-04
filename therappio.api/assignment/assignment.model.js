const mongoose = require("mongoose");
const nanoid = require("nanoid");
const {
  Schema
} = mongoose;

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

const status = ["Not submitted", "Late", "On time"];

const TaskSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: questionTypes,
    required: true
  },
  answer: [String],
  options: [String]
});

const AssignmentSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  client: {
    type: String,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  submittedAt: Date,
  status: {
    type: String,
    required: true,
    default: status[0],
    enum: status
  },
  fields: [TaskSchema],
  title: String
});

module.exports = mongoose.model("Assignment", AssignmentSchema);