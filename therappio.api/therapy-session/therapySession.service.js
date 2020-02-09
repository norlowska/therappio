const db = require("_helpers/db");
const TherapySession = db.TherapySession;

module.exports = {
  getAll,
  getById,
  getClientsSessions,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await TherapySession.find().select("-__v");
}

async function getById(id) {
  return await TherapySession.findById(id).select("-__v");
}

async function getClientsSessions(id) {
  return await TherapySession.find({ client: id }).select("-__v");
}

async function create(sessionParam) {
  console.log(sessionParam);
  const newSession = new TherapySession(sessionParam);
  await newSession.save();
}

async function update(id, sessionParam) {
  const session = await TherapySession.findById(id);

  // validate
  if (!session) throw "Therapy session not found";

  Object.assign(session, sessionParam);
  await session.save();
}

async function _delete(id) {
  await TherapySession.findByIdAndRemove(id);
}
