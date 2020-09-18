const db = require('_helpers/db');
const Icd10Code = db.Icd10Code;

module.exports = {
  getAll,
  getById,
  getByFullCode,
};

async function getAll() {
  return await Icd10Code.find().select('-__v');
}

async function getById(id) {
  return await Icd10Code.findById(id).select('-__v');
}

async function getByFullCode(fullCode) {
  return await Icd10Code.find({ fullCode: fullCode }).select('-__v');
}
