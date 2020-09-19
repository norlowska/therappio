import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const selectAssignments = state => Object.values(state.assignments.byId);
export const selectAssignment = (state, id) => state.assignments.byId[id];

export const selectTherapySessions = state =>
    Object.values(state.therapySessions.byId);
export const selectTherapySession = (state, id) =>
    state.therapySessions.byId[id];

export const selectMoodRecords = state => Object.values(state.moodRecords.byId);
export const selectMoodRecord = (state, id) => state.moodRecords.items[id];

export const selectJournalRecords = state =>
    Object.values(state.journalRecords.byId);
export const selectJournalRecord = (state, id) => state.journalRecords.byId[id];

export const selectClients = state => Object.values(state.clients.byId);
export const selectClient = (state, id) => state.clients.byId[id];

export const selectClientAssignments = (state, clientId) => {
    if (!state.assignments) return null;
    const assignments = selectAssignments(state);
    return assignments.filter(item => item.client._id === clientId);
};

export const selectClientTherapySessions = (state, clientId) => {
    if (!state.therapySessions) return null;

    const therapySessions = selectTherapySessions(state);
    return therapySessions.filter(item => item.client === clientId);
};

export const selectTodaysSessions = state => {
    const therapySessions = selectTherapySessions(state);
    return therapySessions.filter(item =>
        dayjs(item.date).isSame(dayjs(), 'date')
    );
};

export const selectSessionsByMonth = (state, month) => {
    const therapySessions = selectTherapySessions(state);
    return therapySessions.filter(
        item => dayjs(item.date).month() === month - 1
    );
};

export const selectClientMoodRecords = (state, clientId) => {
    if (!state.moodRecords) return null;

    const moodRecords = selectMoodRecords(state);
    return moodRecords.filter(item => item.client._id === clientId);
};

export const selectLastWeekMoodRecords = (state, clientId) =>
    selectClientMoodRecords(state, clientId).filter(item =>
        dayjs(item.createdAt).isBetween(
            dayjs(),
            dayjs().subtract(7, 'days'),
            '(]'
        )
    );

export const selectLastMonthMoodRecords = (state, clientId) =>
    selectClientMoodRecords(state, clientId).filter(item =>
        dayjs(item.createdAt).isBetween(
            dayjs(),
            dayjs().subtract(30, 'days'),
            '(]'
        )
    );

export const selectClientJournalRecords = (state, clientId) => {
    if (!state.journalRecords) return null;

    const journalRecords = selectJournalRecords(state);
    return journalRecords.filter(item => item.client._id === clientId);
};

export const selectDiagnosis = (state, id) => state.diagnoses.byId[id];
