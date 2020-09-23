const db = require('_helpers/db');
const dateFns = require('date-fns');

const TherapyPlan = db.TherapyPlan;

module.exports = {
  create,
  update,
};

async function getById(id) {
  return await TherapyPlan.findById(id).select('-__v');
}
async function create(therapyPlanParam) {
  const newTherapyPlan = new TherapyPlan(therapyPlanParam);
  await newTherapyPlan.save();
  return getById(newTherapyPlan._id);
}

async function update(id, therapyPlanParam) {
  const therapyPlan = await TherapyPlan.findById(id);

  // validate
  if (!therapyPlan) throw 'Therapy plan not found';

  Object.assign(therapyPlan, therapyPlanParam);
  await therapyPlan.save();

  return getById(therapyPlan._id);
}
