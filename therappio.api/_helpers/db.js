const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log('Database sucessfully connected');
    },
    error => {
      console.log('Could not connect to database : ' + error);
    }
  );
mongoose.Promise = global.Promise;

module.exports = {
  User: require('user/user.model'),
  TherapySession: require('therapy-session/therapySession.model'),
  JournalRecord: require('journal/journalRecord.model'),
  MoodRecord: require('mood/moodRecord.model'),
  Assignment: require('assignment/assignment.model'),
  Icd10Code: require('icd10-code/icd10Code.model'),
  Diagnosis: require('diagnosis/diagnosis.model'),
  Therapy: require('therapy/therapy.model'),
  TherapyPlan: require('therapy-plan/therapyPlan.model'),
};
