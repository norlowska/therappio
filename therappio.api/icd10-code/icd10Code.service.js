const db = require('_helpers/db');
const Icd10Code = db.Icd10Code;

module.exports = {
  query: async function query(text) {
    if (!text) return await Icd10Code.find().select('-__v');
    console.log(text);
    return await Icd10Code.find({
      $or: [
        {
          fullCode: new RegExp('.*' + text + '.*', 'i'),
        },
        {
          fullDescription: new RegExp('.*' + text + '.*', 'i'),
        },
        {
          abbreviatedDescription: new RegExp('.*' + text + '.*', 'i'),
        },
        {
          categoryTitle: new RegExp('.*' + text + '.*', 'i'),
        },
      ],
    }).select('-__v');
  },
};
