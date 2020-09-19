const db = require('_helpers/db');
const Assignment = db.Assignment;

module.exports = {
  getAll,
  getById,
  getClientsAssignments,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Assignment.find().select('-__v').populate('client', '_id therapist');
}

async function getById(id) {
  return await Assignment.findById(id).select('-__v').populate('client', '_id therapist');
}

async function getClientsAssignments(id) {
  return await Assignment.find({ client: id }).select('-__v').populate('client', '_id therapist');
}

async function create(assignmentParam) {
  const newAssignment = new Assignment(assignmentParam);
  await newAssignment.save();
  return getById(newAssignment._id);
}

async function update(id, assignmentParam) {
  const assignment = await Assignment.findById(id);

  // validate
  if (!assignment) throw 'Assignment not found';

  Object.assign(assignment, assignmentParam);
  await assignment.save();
}

async function _delete(id) {
  await Assignment.findByIdAndRemove(id);
}
