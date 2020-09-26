import { subDays, differenceInDays } from 'date-fns';
import { compareValues } from '../_utilities';

// state.auth
export const selectCurrentUser = state => state.auth.user;

// state.clients
export const selectClients = state => Object.values(state.clients.byId);
export const selectClient = (state, id) => state.clients.byId[id];

// state.assignments
export const selectAssignments = state => Object.values(state.assignments.byId);
export const selectAssignment = (state, id) => state.assignments.byId[id];

export const selectClientAssignments = (state, clientId) => {
    if (!state.assignments) return null;
    const assignments = selectAssignments(state);
    return assignments.filter(item => item.client._id === clientId);
};

// state.therapySessions
export const selectTherapySessions = state =>
    Object.values(state.therapySessions.byId);
export const selectTherapySession = (state, id) =>
    state.therapySessions.byId[id];

export const selectClientTherapySessions = (state, clientId) => {
    if (!state.therapySessions) return null;

    const therapySessions = selectTherapySessions(state);
    return therapySessions
        .filter(item => item.client === clientId)
        .sort(compareValues('session_no', 'desc'));
};

// state.therapy
export const selectTherapy = (state, therapyId) => state.therapies.items[id];
export const selectClientsTherapy = (state, clientId) =>
    Object.values(state.therapies.byId).find(
        item =>
            item &&
            item.client &&
            ((typeof item.client === 'string' && item.client === clientId) ||
                (typeof item.client === 'object' &&
                    item.client._id === clientId))
    );

// state.moodRecords
export const selectMoodRecords = state => Object.values(state.moodRecords.byId);
export const selectMoodRecord = (state, id) => state.moodRecords.byId[id];

export const selectClientMoodRecords = (state, clientId) => {
    if (!state.moodRecords) return null;

    const moodRecords = selectMoodRecords(state);
    return moodRecords.filter(item => item.client._id === clientId);
};

export const selectLastWeekMoodRecords = (state, clientId) =>
    selectClientMoodRecords(state, clientId).filter(
        item =>
            differenceInDays(subDays(new Date(), 7), new Date(item.createdAt)) <
            7
    );

export const selectLastMonthMoodRecords = (state, clientId) =>
    selectClientMoodRecords(state, clientId).filter(
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

export const selectClientJournalRecords = (state, clientId) => {
    if (!state.journalRecords) return null;

    const journalRecords = selectJournalRecords(state);
    return journalRecords.filter(item => item.client._id === clientId);
};

// state.diagnosis
export const selectDiagnosis = (state, id) => state.diagnoses.byId[id];
