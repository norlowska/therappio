import { subDays, differenceInDays, closestIndexTo } from 'date-fns';
import { compareValues } from '../_utilities/compare';

// state.auth
export const selectCurrentUser = state => state.auth.user;

// state.assignments
export const selectAssignments = state => Object.values(state.assignments.byId);
export const selectAssignment = (state, id) => state.assignments.byId[id];

export const selectLastNotSubmittedAssignment = state => {
  let assignments = Object.values(state.assignments.byId).sort(compareValues('createdAt', 'desc'));
  assignments = assignments.filter(item => item.status === 'Not submitted');
  if (assignments.length > 0) {
    const datesArray = assignments.map(item => new Date(item.dueDate));
    const closest = closestIndexTo(new Date(), datesArray);
    return state.assignments.byId[assignments[closest]._id];
  }
  return null;
};

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

export const selectLastWeekMoodRecords = state =>
  selectMoodRecords(state).filter(
    item => differenceInDays(subDays(new Date(), 7), new Date(item.createdAt)) < 7
  );

export const selectLastMonthMoodRecords = state =>
  selectMoodRecords(state).filter(
    item => differenceInDays(subDays(new Date(), 30), new Date(item.createdAt)) < 30
  );

// state.journalRecords
export const selectJournalRecords = state => Object.values(state.journalRecords.byId);
export const selectJournalRecord = (state, id) => state.journalRecords.byId[id];
