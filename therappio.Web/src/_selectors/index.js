import { subDays, differenceInDays } from 'date-fns';
import { compareValues } from '../_utilities';

// state.auth
export const selectCurrentUser = state => state.auth.user;

// state.patients
export const selectPatients = state => Object.values(state.patients.byId);
export const selectPatient = (state, id) => state.patients.byId[id];

// state.assignments
export const selectAssignments = state => Object.values(state.assignments.byId);
export const selectAssignment = (state, id) => state.assignments.byId[id];

export const selectPatientAssignments = (state, patientId) => {
    if (!state.assignments) return null;
    const assignments = selectAssignments(state);
    return assignments.filter(item => item.patient._id === patientId);
};

// state.therapySessions
export const selectTherapySessions = state =>
    Object.values(state.therapySessions.byId);
export const selectTherapySession = (state, id) =>
    state.therapySessions.byId[id];

export const selectPatientTherapySessions = (state, patientId) => {
    if (!state.therapySessions) return null;

    const therapySessions = selectTherapySessions(state);
    return therapySessions
        .filter(item => item.patient === patientId)
        .sort(compareValues('session_no', 'desc'));
};

// state.therapy
export const selectTherapy = (state, therapyId) => state.therapies.items[id];
export const selectPatientsTherapy = (state, patientId) =>
    Object.values(state.therapies.byId).find(
        item =>
            item &&
            item.patient &&
            ((typeof item.patient === 'string' && item.patient === patientId) ||
                (typeof item.patient === 'object' &&
                    item.patient._id === patientId))
    );

// state.moodRecords
export const selectMoodRecords = state => Object.values(state.moodRecords.byId);
export const selectMoodRecord = (state, id) => state.moodRecords.byId[id];

export const selectPatientMoodRecords = (state, patientId) => {
    if (!state.moodRecords) return null;

    const moodRecords = selectMoodRecords(state);
    return moodRecords.filter(item => item.patient._id === patientId);
};

export const selectLastWeekMoodRecords = (state, patientId) =>
    selectPatientMoodRecords(state, patientId).filter(
        item =>
            differenceInDays(subDays(new Date(), 7), new Date(item.createdAt)) <
            7
    );

export const selectLastMonthMoodRecords = (state, patientId) =>
    selectPatientMoodRecords(state, patientId).filter(
        item =>
            differenceInDays(
                subDays(new Date(), 30),
                new Date(item.createdAt)
            ) < 30
    );

// state.journalRecords
export const selectJournalRecords = state =>
    Object.values(state.journalRecords.byId);
export const selectJournalRecord = (state, id) => state.journalRecords.byId[id];

export const selectPatientJournalRecords = (state, patientId) => {
    if (!state.journalRecords) return null;

    const journalRecords = selectJournalRecords(state);
    return journalRecords.filter(item => item.patient._id === patientId);
};

// state.diagnosis
export const selectDiagnosis = (state, id) => state.diagnoses.byId[id];
