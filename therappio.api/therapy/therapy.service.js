const db = require('_helpers/db');
const Therapy = db.Therapy;

module.exports = {
  getById,
  getClientsTherapy,
  getTherapistsTherapies,
  create,
  update,
  delete: _delete,
};

async function getById(id) {
  return await Therapy.findById(id)
    .select('-__v')
    .populate('client', '_id firstName lastName phoneNumber email diagnosis')
    .populate('therapist', '_id firstName lastName phoneNumber email')
    .populate('therapyPlan', '_id startTime interval endTime');
}

async function getClientsTherapy(id) {
  return await Therapy.findOne({ client: id })
    .select('-__v')
    .populate('therapist', '_id firstName lastName phoneNumber email')
    .populate('therapyPlan', '_id startTime interval endTime');
}

async function getTherapistsTherapies(id) {
  return await Therapy.find({ therapist: id })
    .select('-__v')
    .populate('client', '_id firstName lastName phoneNumber email diagnosis')
    .populate('therapyPlan', '_id startTime interval endTime');
}

async function create(therapyParam) {
  const newTherapy = new Therapy(therapyParam);
  await newTherapy.save();
  return getById(newTherapy._id);
}

async function update(id, therapyParam) {
  const therapy = await Therapytherapy.findById(id);

  // validate
  if (!therapy) throw 'Therapy not found';

  Object.assign(therapy, therapyParam);
  await therapy.save();

  return getById(therapy._id);
}

async function _delete(id) {
  await Therapy.findByIdAndRemove(id);
}
