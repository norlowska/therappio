const db = require('_helpers/db');
const Diagnosis = db.Diagnosis;

module.exports = {
  getById,
  create,
  update,
};

async function getById(id) {
  return await Diagnosis.findById(id)
    .select('-__v')
    .populate('patient', '_id therapist')
    .populate('content');
}

async function create(diagnosisParam) {
  const newDiagnosis = new Diagnosis(diagnosisParam);

  return await newDiagnosis.save();
}

async function update(id, diagnosisParam) {
  const diagnosis = await Diagnosis.findById(id);

  // validate
  if (!diagnosis) throw 'Diagnosis not found';

  Object.assign(diagnosis, diagnosisParam);
  await diagnosis.save();

  return getById(diagnosis._id);
}
