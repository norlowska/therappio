import dayjs from 'dayjs';

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
    if (
        !state.clients.byId[clientId] ||
        !state.clients.byId[clientId].assignments
    )
        return null;
    return state.clients.byId[clientId].map(item =>
        selectAssignment(state, item.id)
    );
};

export const selectClientTherapySessions = (state, clientId) => {
    if (
        !state.clients.byId[clientId] ||
        !state.clients.byId[clientId].therapySessions
    )
        return null;

    return state.clients.byId[
        clientId
    ].therapySessionsclientTherapySessions.map(item =>
        selectTherapySession(state, item.id)
    );
};

export const selectTodaysSessions = state => {
    const therapySessions = selectTherapySessions(state);
    return therapySessions.filter(item => item.therapist._id === therapistId);
};

export const selectSessionsByMonth = (state, month) => {
    const therapySessions = selectTherapySessions(state);
    return therapySessions.filter(
        item => dayjs(item.date).month() === month - 1
    );
};

export const selectClientMoodRecords = (state, clientId) => {
    if (
        !state.clients.byId[clientId] ||
        !state.clients.byId[clientId].moodRecords
    )
        return null;

    return state.clients.byId[clientId].moodRecords.map(item =>
        selectMoodRecord(state, item.id)
    );
};

export const selectClientJournalRecords = (state, clientId) => {
    if (
        !state.clients.byId[clientId] ||
        !state.clients.byId[clientId].journalRecords
    )
        return null;

    return state.clients.byId[clientId].journalRecords.map(item =>
        selectJournalRecord(state, item.id)
    );
};
