const mongoose = require("mongoose");

const { Schema } = mongoose;

const TherapySessionSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User", required: true },
  therapist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  notes: String,
  tags: [String]
});

module.exports = mongoose.model("TherapySession", TherapySessionSchema);
