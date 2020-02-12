const mongoose = require("mongoose");
const nanoid = require("nanoid");
const Role = require("_helpers/role");
const { Schema } = mongoose;

const genders = ["male", "female"];

const UserSchema = new Schema({
  shortId: { type: String, unique: true, default: () => nanoid(10) },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  hash: { type: String },
  firstName: { type: String, required: true, minlength: 2, maxlength: 35 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 35 },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  address: String,
  therapist: { type: Schema.Types.ObjectId, ref: "User" },
  dateOfBirth: Date,
  gender: { type: String, enum: genders },
  emergencyContact: {
    name: String,
    phoneNumber: String
  },
  diagnosis: [String],
  role: { type: String, enum: Object.values(Role), required: true }
});

UserSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", UserSchema);
