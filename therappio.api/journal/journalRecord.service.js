const db = require("_helpers/db");
const JournalRecord = db.JournalRecord;

module.exports = {
  getAll,
  getById,
  getClientsRecords,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await JournalRecord.find()
    .select("-__v")
    .populate("client", "_id therapist");
}

async function getById(id) {
  return await JournalRecord.findById(id)
    .select("-__v")
    .populate("client", "_id therapist");
}

async function getClientsRecords(id) {
  return await JournalRecord.find({ client: id })
    .select("-__v")
    .populate("client", "_id therapist");
}

async function create(recordParam) {
  const newRecord = new JournalRecord(recordParam);
  await newRecord.save();
}

async function update(id, recordParam) {
  const record = await JournalRecord.findById(id);

  // validate
  if (!record) throw "Journal record not found";

  Object.assign(record, recordParam);
  await record.save();
}

async function _delete(id) {
  await JournalRecord.findByIdAndRemove(id);
}
