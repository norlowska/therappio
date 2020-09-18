const mongoose = require('mongoose');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const Icd10CodeSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  categoryCode: {
    type: String,
    required: true,
  },
  diagnosisCode: {
    type: String,
    required: true,
  },
  fullCode: {
    type: String,
    required: true,
  },
  abbreviatedDescription: {
    type: String,
    required: true,
  },
  fullDescription: String,
  categoryTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Icd10Code', Icd10CodeSchema);
