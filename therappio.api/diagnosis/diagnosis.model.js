const mongoose = require('mongoose');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const DiagnosisSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    patient: { type: String, ref: 'User', required: true },
    fullCodes: [String],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

DiagnosisSchema.virtual('content', {
  ref: 'Icd10Code',
  localField: 'fullCodes',
  foreignField: 'fullCode',
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
