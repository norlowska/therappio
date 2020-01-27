const db = require("_helpers/db");
const MoodRecord = db.MoodRecord;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await MoodRecord.find()
    .select("-__v")
    .populate("client", "_id therapist");
}

async function getById(id) {
  return await MoodRecord.findById(id)
    .select("-__v")
    .populate("client", "_id therapist");
}

async function create(recordParam) {
  const newRecord = new MoodRecord(recordParam);
  await newRecord.save();
}

async function update(id, recordParam) {
  const record = await MoodRecord.findById(id);

  // validate
  if (!record) throw "Mood record not found";

  Object.assign(record, recordParam);
  await record.save();
}

async function _delete(id) {
  await MoodRecord.findByIdAndRemove(id);
}
