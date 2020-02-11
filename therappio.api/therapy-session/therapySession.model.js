const mongoose = require("mongoose");
const nanoid = require("nanoid");
const { Schema } = mongoose;

const TherapySessionSchema = new Schema({
  shortId: { type: String, unique: true, default: () => nanoid(10) },
  session_no: { type: Number, unique: true, min: 0 },
  client: { type: Schema.Types.ObjectId, ref: "User", required: true },
  therapist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  notes: String,
  tags: [String]
});

module.exports = mongoose.model("TherapySession", TherapySessionSchema);
