const db = require('_helpers/db');
const JournalRecord = db.JournalRecord;

module.exports = {
  getAll,
  getById,
  getPatientsRecords,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await JournalRecord.find().select('-__v').populate('patient', '_id therapist');
}

async function getById(id) {
  return await JournalRecord.findById(id).select('-__v').populate('patient', '_id therapist');
}

async function getPatientsRecords(id) {
  return await JournalRecord.find({ patient: id })
    .select('-__v')
    .populate('patient', '_id therapist');
}

async function create(recordParam) {
  const newRecord = new JournalRecord(recordParam);
  await newRecord.save();

  return getById(newRecord._id);
}

async function update(id, recordParam) {
  const record = await JournalRecord.findById(id);

  // validate
  if (!record) throw 'Journal record not found';

  Object.assign(record, recordParam);
  await record.save();
}

async function _delete(id) {
  await JournalRecord.findByIdAndRemove(id);
}
