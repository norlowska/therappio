import { subDays, differenceInDays } from 'date-fns';

// state.auth
export const selectCurrentUser = state => state.auth.user;

// state.assignments
export const selectAssignments = state => Object.values(state.assignments.byId);
export const selectAssignment = (state, id) => state.assignments.byId[id];

// state.therapy
export const selectTherapy = (state, therapyId) => state.therapies.items[id];
export const selectPatientsTherapy = (state, patientId) =>
  Object.values(state.therapies.byId).find(
    item =>
      item &&
      item.patient &&
      ((typeof item.patient === 'string' && item.patient === patientId) ||
        (typeof item.patient === 'object' && item.patient._id === patientId))
  );

// state.moodRecords
export const selectMoodRecords = state => Object.values(state.moodRecords.byId);
export const selectMoodRecord = (state, id) => state.moodRecords.byId[id];

export const selectLastWeekMoodRecords = (state, patientId) =>
  selectPatientMoodRecords(state, patientId).filter(
    item => differenceInDays(subDays(new Date(), 7), new Date(item.createdAt)) < 7
  );

export const selectLastMonthMoodRecords = (state, patientId) =>
  selectPatientMoodRecords(state, patientId).filter(
    item => differenceInDays(subDays(new Date(), 30), new Date(item.createdAt)) < 30
  );

// state.journalRecords
export const selectJournalRecords = state => {
  console.log('select');
  return Object.values(state.journalRecords.byId);
};
export const selectJournalRecord = (state, id) => state.journalRecords.byId[id];

export const selectPatientJournalRecords = (state, patientId) => {
  if (!state.journalRecords) return null;

  const journalRecords = selectJournalRecords(state);
  return journalRecords.filter(item => item.patient._id === patientId);
};
